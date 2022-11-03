import React from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './App.css';
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import { generateDownload } from "./utils/cropImage";

import bkg1 from './images/bkg-1.png'
import bkg2 from './images/bkg-2.png'
import bkg3 from './images/bkg-default.png'

import ct1 from './images/bra.svg'
import ct2 from './images/eua.svg'
import ct3 from './images/ger.svg'

import imageHeader from './images/header-img.svg'
import btnTemplate from './images/btn-template.svg'
import btnBackground from './images/btn-background.svg'
import print from './images/print.svg'
import share from './images/share.svg'
import adPlaceholder from './images/ad-placeholder.svg'
import positionAttack from './images/position-attack.svg'
import positionCenter from './images/position-center.svg'
import positionDefense from './images/position-defense.svg'
import positionGoal from './images/position-goal.svg'
import lockImg from './images/LOCK.png'
import { IMaskInput } from "react-imask";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [foto, setFoto] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [country, setCountry] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [position, setPosition] = useState('');
  const [background, setBackground] = useState('');
  const [num, setNum] = useState('');
  const [countryImg, setCountryImg] = useState('');


  const handleChange = (e) => {
    e.preventDefault()
    const containerSelect = document.querySelector('.container')
    containerSelect.classList.remove('hide')
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
    const countryImgs = [ct1, ct2, ct3];
    setCountry(country.toUpperCase());
    if (country === 'bra') {
      setCountryImg(countryImgs[0])
    }
    if (country === 'ger') {
      setCountryImg(countryImgs[2])
    }
    if (country === 'eua') {
      setCountryImg(countryImgs[1])
    }
  }
  const handleChangeWeight = (e) => {
    const weight = e.target.value;
    setWeight(weight);
  }
  const handleChangePosition = (e) => {
    const position = e.target.value;
    setPosition(position);
  }

  const sharePic = () => {

    const input = document.getElementById('image-render')
    html2canvas(input, { logging: true, letterRendering: 1, useCORS: true }).then(canvas => {
      // const resultado = document.querySelector('.resultado')
      // resultado.appendChild(canvas)
      // const imgWidth = 49;
      // const imgHeight = canvas.height * imgWidth / canvas.width;
      const imgData = canvas.toDataURL('img/png')
      setFoto(imgData)
      canvas.toBlob(
        (blob) => {
          const previewUrl = window.URL.createObjectURL(blob);
          
          const anchor = document.createElement("a");
          anchor.download = "image.jpeg";
          anchor.href = URL.createObjectURL(blob);
          anchor.click();
          
          window.URL.revokeObjectURL(previewUrl);
        },
        "image/png",
        0.66
        );
    })
  }
  const Print = () => {
    const input = document.getElementById('image-render')
    html2canvas(input, { logging: true, letterRendering: 1, useCORS: true }).then(canvas => {
      const resultado = document.querySelector('.resultado')
      resultado.appendChild(canvas)
      // const conteudo2 = document.querySelector('.conteudo-secundario')
      // conteudo2.appendChild(canvas)
      // const imgWidth = 49;
      // const imgHeight = canvas.height * imgWidth / canvas.width;
      const imgData = canvas.toDataURL('img/png')
      setFoto(imgData)
      // const pdf = new jsPDF('p', 'mm', 'a4');
      // pdf.addImage(imgData, 'PNG', 4, 4, imgWidth, imgHeight);
      // pdf.addImage(imgData, 'PNG', 80, 4, imgWidth, imgHeight);
      // pdf.addImage(imgData, 'PNG', 4, 80, imgWidth, imgHeight);
      // pdf.addImage(imgData, 'PNG', 80, 80, imgWidth, imgHeight);

      // if(paid) {
      //   pdf.save('minha-figurinha.pdf')
      // }
    })
    
  }

  

  const printFull = () => {
    const input2 = document.getElementById('image-render2')
    html2canvas(input2, { logging: true, letterRendering: 1, useCORS: true }).then(canvas => {
      const imgWidth = 49;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const imgData = canvas.toDataURL('img/png')
      // setFotoFull(imgData)
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 4, 4, imgWidth, imgHeight);
      pdf.addImage(imgData, 'PNG', 80, 4, imgWidth, imgHeight);
      pdf.addImage(imgData, 'PNG', 4, 80, imgWidth, imgHeight);
      pdf.addImage(imgData, 'PNG', 80, 80, imgWidth, imgHeight);
      
      
      
      if(paid) {
        canvas.toBlob(
          (blob) => {
            const previewUrl = window.URL.createObjectURL(blob);
            
            const anchor = document.createElement("a");
            anchor.download = "image.jpeg";
            anchor.href = URL.createObjectURL(blob);
            anchor.click();
            
            window.URL.revokeObjectURL(previewUrl);
          },
          "image/png",
          0.66
          );
          pdf.save('minha-figurinha.pdf')
      }
    })
  }

  const imprimir = () => {
    const conteudo = document.querySelector('.conteudo-principal')
    const resultado = document.querySelector('.resultado')
    const imprimirBtn = document.querySelector('.imprimirBtn')
    Print();
    conteudo.classList.add('hide')
    imprimirBtn.classList.add('hide')
    resultado.classList.remove('hide')
  }

  const changeBackground = (e) => {
    e.preventDefault();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    setNum(0)
    const backgrounds = [bkg1, bkg2, bkg3];
    setBackground(backgrounds[0])
    if (num === 0) {
      setBackground(backgrounds[num])
      setNum(1)

    } else if (num === 1) {
      setBackground(backgrounds[num])
      setNum(2)
    } else if (num === 2) {
      setBackground(backgrounds[num])
      setNum(3)
    } else if (num === 3) {
      setNum(0)

    }
  }

  const inputRef = React.useRef();

  const triggerFileSelectPopup = () => inputRef.current.click();

  const [image, setImage] = React.useState(null);
  const [croppedArea, setCroppedArea] = React.useState(null);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onSelectFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
    }
  };

  const onDownload = () => {
    generateDownload(image, croppedArea);
    const containerSelect = document.querySelector('.container')
    const backgrounds = [bkg1, bkg2, bkg3];
    setBackground(backgrounds[0])
    const inputs = document.getElementsByTagName('input')
    const selects = document.getElementsByTagName('select')
    const placeholder = document.querySelector('.placeholder')
    const btnBackdround = document.querySelector('.btn-background')
    containerSelect.classList.add('hide');
    placeholder.classList.add('hide');
    for (const input of inputs) {
      input.classList.remove('blocked');
    }
    for (const select of selects) {
      select.classList.remove('blocked');
    }
    btnBackdround.classList.remove('blocked');

  };

  document.addEventListener('contextmenu', event => event.preventDefault());

  document.addEventListener('keyup', (e) => {
    if (e.key === 'PrintScreen') {
      navigator.clipboard.writeText('');
      alert('Screenshots disabled!');
    }
  });

  /** TO DISABLE PRINTS WHIT CTRL+P **/
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'p') {
      alert('This section is not allowed to print or export to PDF');
      e.cancelBubble = true;
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  });

  const [paid, setPaid] = useState(false);
  // const [loaded, setLoaded] = useState(false);

  // let paypalRef = useRef();

  // const product = {
  //   price: 10.70,
  //   description: 'Minha figurinha'
  // }

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   const id = "AUzzVMKSH4TR7eFjwRgh5kgq4Rrnn6omRibodBZ5JjSrdLQKQ6MGTtl1gy-JHcpUcatoBBMwC-FP2DBe"
  //   script.src = `https://www.paypal.com/sdk/js?currency=BRL&client-id=${id}`
  //   script.addEventListener("load", () => setLoaded(true));
  //   document.body.appendChild(script);

  //   if(loaded) {
  //     function loadButtonsAndLogicAboutPayment() {
  //       setTimeout(() => {
  //         window.paypal.Buttons({
  //           createOrder: (data, actions) => {
  //             return actions.order.create({
  //               purchase_units: [
  //                 {
  //                   description: product.description,
  //                   amount: {
  //                     currency_code: "BRL",
  //                     value: product.price
  //                   }
  //                 }
  //               ]
  //             })
  //           },
  //           onApprove: async (_, actions) => {
  //             const order = await actions.order.capture();
  //             setPaid(true);
  //             console.log(order)
  //           }
  //         })
  //         .render(paypalRef)
  //       })
  //     }
  //     loadButtonsAndLogicAboutPayment();
  //   }
  // })

  const amount = "2";
  const currency = "BRL";
  const style = { "layout": "vertical" };

  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, showSpinner]);


    return (<>
      {(showSpinner && isPending) && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(function () {
            setPaid(true)
          });
        }}
      />
    </>
    );
  }

  if(paid) {
    const saveButton = document.querySelector('.save-foto-button');
    if(saveButton && paid) {
      saveButton.classList.add('ajosdjaosidjaso12ij3o1i2j3o1i2h3oi12jh3oi1h231oi2h3o12h3o1i23h1oi23ho1i2h3oi12h31i23ho1i2h3o1i2h31i2h3o1i23ho1i2h3oi1h23oi1h2o3ih12oi3h1oi23h1oi2h3123kj12bn3kj1b23kjhb12jhv31gh2c3hfg1c23gfx12gf3xg21f3c1hg2v3ljh12vb3ljh12b3i1u23ou12y3tu132tyu1rt2y3tr13ytdf1t23c12gh3vk123vjl123j12h3bjl1h2b3h1l2j3bg123yu12g3');

    }
  }

  return (
    <div className="App">

      <div className='container hide'>
        <div className='container-cropper'>
          <p>Fazer upload de imagem com fundo transparente para melhor compatibilidade!</p>
          <p>Para remover o fundo acesse o site <a target='_blank' href="https://www.remove.bg/" rel="noreferrer">Remove.bg</a></p>

          {image ? (
            <>
              <div className='cropper'>
                <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  aspect={3 / 4}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>

              <div className='slider'>
                <Slider
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e, zoom) => setZoom(zoom)}
                />
              </div>
            </>
          ) : null}
        </div>

        <div className='container-buttons'>
          <input
            type='file'
            accept='image/*'
            ref={inputRef}
            onChange={onSelectFile}
            style={{ display: "none" }}
          />
          <button onClick={triggerFileSelectPopup} className="buttonEscolher">Escolher</button>
          <button onClick={onDownload} className="buttonConfimar">Confirmar</button>
        </div>
      </div>


      <header>
        <img src={imageHeader} alt="Minha figurinha da copa 2022" />
      </header>
      <div className="ad-wrapper-test">
        <img src={adPlaceholder} alt="" className='anuncioPlaceholder' />
      </div>
      <main>

        <div className="wrapper conteudo-principal">
          <div className="image-render" id='image-render'>
            <img crossOrigin="" alt="" className='locker' src={lockImg} />

            <div className="imageToRender">
              <div className='placeholder' />
              <img crossOrigin="" alt="" className='userImage' />
              <img crossOrigin="" src={background} alt="" />
            </div>
            <p className='nameUser' >{name}</p>
            <p className='dateUser' >{date}</p>
            <div className='country'>
              <p>{country}</p>
              {/* <img src={countryImg} alt="" className="country-img"/> */}

              {(() => {
                if (!country) {
                  return (
                    ''
                  )
                } else if (country) {
                  return (
                    <img src={countryImg} alt="" className="country-img" />
                  )
                }
              })()}
            </div>
            <p className='heightUser'>{height}</p>
            <p className='weightUser'>{weight}</p>
            <div className="positionWrapper">
              {(() => {
                if (!position) {
                  return (
                    ''
                  )
                } else if (position === 'ataque') {
                  return (
                    <img src={positionAttack} className="positionBackground" alt='' />
                  )
                } else if (position === 'centro') {
                  return (
                    <img src={positionCenter} className="positionBackground" alt='' />
                  )
                } else if (position === 'defesa') {
                  return (
                    <img src={positionDefense} className="positionBackground" alt='' />
                  )
                } else if (position === 'goleiro') {
                  return (
                    <img src={positionGoal} className="positionBackground" alt='' />
                  )
                }
              })()}

            </div>
          </div>

          <div className="wrapper-form">
            <form action="/">
              <label htmlFor="foto">
                <button className="upload-foto-button" onClick={handleChange}></button>
              </label>

              <input type="text" name="" id="" placeholder='Cristiano Ronaldo' onChange={handleChangeName} className="blocked" />

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
                className="blocked"
              />

              <div className="select" >
                <select defaultValue={'default'} name="" id="" onChange={handleChangeCountry} className="blocked">
                  <option value="default" disabled>País</option>
                  <option value="bra" >Brasil</option>
                  <option value="eua">U.S.A</option>
                  <option value="ger">Alemanha</option>
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
                  className="blocked"
                />
                <IMaskInput
                  mask="00kg"
                  placeholder="87kg"
                  onChange={handleChangeWeight}
                  className="blocked"
                />
              </div>

              <select defaultValue={'default'} name="" id="" onChange={handleChangePosition} className="blocked">
                <option value="default" disabled >Posição</option>
                <option value="goleiro">Goleiro</option>
                <option value="ataque">Ataque</option>
                <option value="centro">Centro</option>
                <option value="defesa">Defesa</option>
              </select>

              <div className="wrapper-buttons">
                <button className='btn-template blocked'><img src={btnTemplate} alt="" /></button>
                <button onClick={changeBackground} className='btn-background blocked'><img src={btnBackground} alt="" /></button>
              </div>
            </form>
          </div>
        </div>

        <div className="wrapper conteudo-secundario">
          <div className="image-render2" id='image-render2'>

            <div className="imageToRender">
              {/* <div className='placeholder' /> */}
              <img crossOrigin="" alt="" className='userImageFinal' />
              <img crossOrigin="" src={background} alt="" />
            </div>
            <p className='nameUser' >{name}</p>
            <p className='dateUser' >{date}</p>
            <div className='country'>
              <p>{country}</p>
              {/* <img src={countryImg} alt="" className="country-img"/> */}

              {(() => {
                if (!country) {
                  return (
                    ''
                  )
                } else if (country) {
                  return (
                    <img src={countryImg} alt="" className="country-img" />
                  )
                }
              })()}
            </div>
            <p className='heightUser'>{height}</p>
            <p className='weightUser'>{weight}</p>
            <div className="positionWrapper">
              {(() => {
                if (!position) {
                  return (
                    ''
                  )
                } else if (position === 'ataque') {
                  return (
                    <img src={positionAttack} className="positionBackground" alt='' />
                  )
                } else if (position === 'centro') {
                  return (
                    <img src={positionCenter} className="positionBackground" alt='' />
                  )
                } else if (position === 'defesa') {
                  return (
                    <img src={positionDefense} className="positionBackground" alt='' />
                  )
                } else if (position === 'goleiro') {
                  return (
                    <img src={positionGoal} className="positionBackground" alt='' />
                  )
                }
              })()}

            </div>
          </div>

        </div>

        <div className="resultado hide">
          <button onClick={printFull} download className="save-foto-button blocked" ></button>
          
          <div style={{ maxWidth: "750px", minHeight: "200px", marginTop: "50px" }}>
            <PayPalScriptProvider
              options={{
                "client-id": "AUzzVMKSH4TR7eFjwRgh5kgq4Rrnn6omRibodBZ5JjSrdLQKQ6MGTtl1gy-JHcpUcatoBBMwC-FP2DBe",
                components: "buttons",
                currency: "BRL"
              }}
            >
              <ButtonWrapper
                currency={currency}
                showSpinner={false}
              />
            </PayPalScriptProvider>
          </div>

          {/* {paid ? (
          // eslint-disable-next-line jsx-a11y/anchor-has-content
          <a href={foto} download className="save-foto-button" ></a>
        ): ( 
          <div>
            <p>{product.description} por R${product.price}</p>
            <div ref={v => (paypalRef = v)} />
          </div>
        )} */}
        </div>

        <div className="ad-wrapper-test"><img src={adPlaceholder} alt="" className='anuncioPlaceholder' /></div>

        <div className="wrapper-share">
          <button onClick={sharePic} className="share"><img src={share} alt="" /></button>
          <button onClick={imprimir} className="imprimirBtn"><img src={print} alt="" /></button>
        </div>

        <div className="ad-wrapper-test"><img src={adPlaceholder} alt="" className='anuncioPlaceholder' /></div>

      </main>
      <footer></footer>
    </div>
  );
}

export default App;
