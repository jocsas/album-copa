import { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './App.css';

import imageHeader from './images/header-img.svg'
import btnTemplate from './images/btn-template.svg'
import btnBackground from './images/btn-background.svg'
import placeholder from './images/placeholder.png'
import print from './images/print.svg'
import share from './images/share.svg'
import imageUploadButton from './images/upload-foto.svg'
import adPlaceholder from './images/ad-placeholder.svg'
import positionBkg from './images/position.svg'
import positionAttack from './images/position-attack.svg'
import positionCenter from './images/position-center.svg'
import positionDefense from './images/position-defense.svg'
import { IMaskInput } from "react-imask";
function App() {
  const [foto, setFoto] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [country, setCountry] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [position, setPosition] = useState('');

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const fotoURL = URL.createObjectURL(file);
    setFoto(fotoURL);
  };

  const handleChangeName = (e) => {
    const name = e.target.value;
    const nameUppercase = name.toUpperCase();
    setName(nameUppercase);
  }
  const handleChangeDate = (e) => {
    const date = e.target.value;
    const newDate = date.replace(/(^|-)0+/g, "$1")
    setDate(newDate);
  }
  const handleChangeHeight = (e) => {
    const height = e.target.value;
    setHeight(height);
  }
  const handleChangeCountry = (e) => {
    const country = e.target.value;
    setCountry(country);
  }
  const handleChangeWeight = (e) => {
    const weight = e.target.value;
    setWeight(weight);
  }
  const handleChangePosition = (e) => {
    const position = e.target.value;
    setPosition(position);
  }
  const Print = () =>{     
    const input = document.getElementById('image-render')
    html2canvas(input, {logging: true, letterRendering: 1, useCORS: true}).then(canvas => {
      document.body.appendChild(canvas)
      const imgWidth = 65;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const imgData = canvas.toDataURL('img/png')
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('teste.pdf')
    })
  }
  return (
    <div className="App">
      <header>
        <img src={imageHeader} alt="Minha figurinha da copa 2022" />
      </header>
      <main>
        <div className="ad-wrapper"><img src={adPlaceholder} alt="" className='adPlaceholder' /></div>
        <div className="wrapper">
          <div className="image-render" id='image-render'>
            {foto ? <img crossOrigin="" src={foto} alt="" /> : <img crossOrigin="" src={placeholder} alt="" />}
            <p className='nameUser' >{name}</p>
            <p className='dateUser' >{date}</p>
            <p>{country}</p>
            <p className='heightUser'>{height}</p>
            <p className='weightUser'>{weight}</p>
            <div className="positionWrapper">
              {(() => {
                if (!position) {
                  return (
                    <img src={positionBkg} className="positionBackground" alt='' />
                  )
                } else if (position === 'atacante') {
                  return (
                    <img src={positionAttack} className="positionBackground" alt='' />
                  )
                } else if (position === 'centro-avante'){
                  return (
                    <img src={positionCenter} className="positionBackground" alt='' />
                  )
                }else if (position === 'defesa'){
                  return (
                    <img src={positionDefense} className="positionBackground" alt='' />
                  )
                }
              })()}
  
            </div>
          </div>
          
          <div className="wrapper-form">
            <form action="/">
              <label htmlFor="foto">
                <img src={imageUploadButton} alt="" />
                <input hidden type="file" name="arquivo" id="foto" onChange={handleChange} />
              </label>

              <input type="text" name="" id="" placeholder='Cristiano Ronaldo' onChange={handleChangeName} />

              <IMaskInput
                name="dateMask"
                mask="num"
                blocks={{
                  num: {
                    mask: '00-00-0000',
                  }
                }}
                placeholder="5-2-1985"
                onChange={handleChangeDate}
              // value={date.dateMask}
              />

              <div className="select">
                <select name="" id="" onChange={handleChangeCountry}>
                  <option value="portugal">Portugal</option>
                  <option value="brasil">Brasil</option>
                  <option value="china">China</option>
                  <option value="franca">França</option>
                </select>
              </div>

              <div className="input-wrapper">
                <IMaskInput
                  mask="heightm"
                  blocks={{
                    height: {
                      mask: '0,00',
                    }
                  }}
                  placeholder="1,87m"
                  onChange={handleChangeHeight}
                />
                <IMaskInput
                  mask="00kg"
                  placeholder="87kg"
                  onChange={handleChangeWeight}
                />
              </div>
              <select defaultValue={'default'} name="" id="" onChange={handleChangePosition}>
                <option value="default" disabled >Posição</option>
                <option value="atacante">Atacante</option>
                <option value="centro-avante">Centro-avante</option>
                <option value="defesa">Defesa</option>
              </select>
              <div className="wrapper-buttons">
                <button className='btn-template'><img src={btnTemplate} alt="" /></button>
                <button className='btn-background'><img src={btnBackground} alt="" /></button>
              </div>
            </form>
          </div>
        </div>
        <div className="ad-wrapper"><img src={adPlaceholder} alt="" className='adPlaceholder' /></div>
        <div className="wrapper-share">
          <button><img src={share} alt="" /></button>
          <button onClick={Print}><img src={print} alt="" /></button>
        </div>
        <div className="ad-wrapper"><img src={adPlaceholder} alt="" className='adPlaceholder' /></div>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
