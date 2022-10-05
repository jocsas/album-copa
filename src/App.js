import './App.css';
import imageHeader from './images/header-img.svg'
import btnTemplate from './images/btn-template.svg'
import btnBackground from './images/btn-background.svg'
import placeholder from './images/placeholder.png'
import print from './images/print.svg'
import share from './images/share.svg'
import imageUploadButton from './images/upload-foto.svg'
import adPlaceholder from './images/ad-placeholder.svg'
import { IMaskInput } from "react-imask";
function App() {
  return (
    <div className="App">
      <header>
        <img src={imageHeader} alt="Minha figurinha da copa 2022" />
      </header>
      <main>
        <div className="ad-wrapper"><img src={adPlaceholder} alt="" className='adPlaceholder' /></div>
        <div className="wrapper">
          <div className="image-render">
            <img src={placeholder} alt="" />
          </div>
          <div className="wrapper-form">
            <form action="/">
              <label htmlFor="imageUpload" className='imageUpload'>
                <img src={imageUploadButton} alt="" />
                <input type="file" hidden name="" id="imageUpload" />
              </label>
              <input type="text" name="" id="" placeholder='Cristiano Ronaldo' />
              <IMaskInput
                mask="0-0-0000"
                placeholder="5-2-1985"
              />
              <div className="select">
                <select name="" id="">
                  <option value="portugal">Portugal</option>
                  <option value="brasil">Brasil</option>
                  <option value="china">China</option>
                  <option value="franca">França</option>
                </select>
              </div>
              <div className="input-wrapper">
                <IMaskInput
                  mask="0,00m"
                  placeholder="1,87m"
                />
                <IMaskInput
                  mask="00kg"
                  placeholder="87kg"
                />
              </div>
              <select name="" id="">
                <option value="">Atacante</option>
                <option value="">Centro-avante</option>
                <option value="">Defesa</option>
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
          <button><img src={print} alt="" /></button>
        </div>
        <div className="ad-wrapper"><img src={adPlaceholder} alt="" className='adPlaceholder' /></div>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
