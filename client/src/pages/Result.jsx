import React, { useContext, useEffect, useState, useRef } from 'react'
import {assets} from '../assets/assets'
import {motion} from 'framer-motion'
import { AppContext } from '../context/AppContext'
import { loadImage } from "canvas";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ChevronIcon = ({ open }) => (
  <svg
  className={` h-5 transition-transform ${open ? "rotate-180" : ""}`}
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
</svg>
);

//Custom Dropdown 
const CustomDropdown = ({format = '',setFormat = () =>{},formats = []}) => {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="bg-white/80 backdrop-blur-sm border-2 border-blue-200 text-gray-800 px-8 py-3 rounded-full cursor-pointer text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-300"
      >
        <div className='flex justify-between items-center'>
        <p className="font-medium">{format}</p>
        <ChevronIcon open={open}></ChevronIcon> </div>
      </button>

      {open && (
        <div ref={dropdownRef} className="absolute rounded-xl z-50 mt-2 w-40 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-2xl">
          {formats.map((fmt) => (
            <div
              key={fmt}
              role="menuitem"
              tabIndex={0}
              onClick={() => {
                setFormat(fmt);
                setOpen(false);
              }}
              className="text-gray-800 px-8 py-3 rounded-xl hover:bg-blue-50 cursor-pointer text-center transition-colors duration-200 font-medium"
            >
              {fmt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const Result = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState(assets.unicorn) // Unicorn image as default
  const[isImageLoaded, setIsImageLoaded] = useState(false)
  const[loading, setLoading] = useState(false)
  const [input, setInput] = useState('')
  const [format,setFormat] = useState('PNG')
  const {generateImage, isAuthenticated, user, setShowLogin} = useContext(AppContext)

  const onSubmitHandler = async(e) =>{
    e.preventDefault()
    
    if (!isAuthenticated) {
      toast.error('Please login to generate images')
      return
    }
    
    setLoading(true)

    if(input){
      const image = await generateImage(input)
      if(image){
        setIsImageLoaded(true)
        setImage(image)
      }
    }
    setLoading(false)

  }
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  //Convert Image into different formats [JPEG, PNG, SVG, WebP]
  const convertImage = async (input, format) => {
    const image = await loadImage(input)
    const extension = format.toLowerCase()
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    canvas.width = image.width
    canvas.height = image.height
    ctx.drawImage(image, 0, 0)
    

    //Trigger image download
    const downloadImage = (blob) => {
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `image.${extension}`
      link.click()
      URL.revokeObjectURL(url)
    };

    if (extension === "svg") {
      const dataUrl = canvas.toDataURL("image/png")
      console.log(dataUrl)
      const svgContent = `
        <svg xmlns='http://www.w3.org/2000/svg' width='${image.width}' height='${image.height}'>
          <image href='${dataUrl}' width='${image.width}' height='${image.height}'/>
        </svg>`
      const blob = new Blob([svgContent], { type: "image/svg+xml" })
      downloadImage(blob)
    }else{
      canvas.toBlob((blob) => {
        if (blob) downloadImage(blob, extension)
        else console.error("Failed to convert canvas to blob.")
        }, `image/${extension}`)
    }
  };
  
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Enhanced Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <motion.form
        initial={{opacity:0, y:50}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.8, ease:"easeOut"}}
        onSubmit={onSubmitHandler} 
        className='relative z-10 flex flex-col min-h-screen justify-center items-center px-4 py-8'
      >
        {/* Enhanced Header Section */}
        <motion.div 
          initial={{opacity:0, y:-30}}
          animate={{opacity:1, y:0}}
          transition={{duration:0.8, delay:0.2}}
          className="text-center mb-12"
        >
          {/* <motion.div
            initial={{scale: 0.8}}
            animate={{scale: 1}}
            transition={{duration: 0.6, delay: 0.4}}
            className="inline-block mb-6"
          >
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </motion.div> */}
          
          <div className="text-4xl font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 leading-tight">
            Your AI Creation
          </div>
           
          <motion.p 
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:0.8, delay:0.6}}
            className="text-gray-700 text-lg max-w-2xl mx-auto font-medium"
          >
            {!isImageLoaded ? 
              (isAuthenticated ? "✨ Ready to bring your imagination to life? ✨" : "🌟 Login to start creating amazing images! 🌟") 
              : "🎨 Your masterpiece is ready! 🎨"
            }
          </motion.p>
        
          <motion.div
            initial={{opacity:0, y:20}}
            animate={{opacity:1, y:0}}
            transition={{duration:0.8, delay:0.8}}
            className="mt-6"
          >
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 shadow-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700 font-medium">AI-Powered Image Generation</span>
            </div>
          </motion.div>
         </motion.div>

        {/* Enhanced Image Display Section */}
        <motion.div 
          initial={{opacity:0, scale:0.8}}
          animate={{opacity:1, scale:1}}
          transition={{duration:0.8, delay:0.4}}
          className="relative mb-12"
        >
          <div className="relative group">
            {/* Enhanced image container with glassmorphism effect */}
            <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white/90 backdrop-blur-sm p-6 transform transition-all duration-700 group-hover:scale-105 group-hover:shadow-3xl border border-white/20">
              {/* Glowing border effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              
              <div className="relative z-10">
                <img 
                  src={image} 
                  alt="Generated AI Art" 
                  className="max-w-sm md:max-w-lg rounded-2xl object-cover transition-all duration-700 group-hover:brightness-110 group-hover:contrast-110 shadow-lg" 
                />
              </div>
              
              {/* Enhanced loading overlay */}
              {loading && (
                <motion.div 
                  initial={{opacity:0}}
                  animate={{opacity:1}}
                  className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-2xl flex items-center justify-center z-20"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                    <div className="text-white text-xl font-semibold">Creating your masterpiece...</div>
                    <div className="text-white/80 text-sm mt-2">This may take a few moments</div>
                  </div>
                </motion.div>
              )}
              
              {/* Enhanced progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-200/50 rounded-b-3xl overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                  initial={{width: 0}}
                  animate={{width: loading ? "100%" : "0%"}}
                  transition={{duration: loading ? 10 : 0}}
                />
              </div>
            </div>
            
            {/* Floating action buttons when image is loaded */}
            {isImageLoaded && (
              <motion.div 
                initial={{opacity:0, y:20}}
                animate={{opacity:1, y:0}}
                transition={{duration:0.5, delay:0.6}}
                className="absolute -top-4 -right-4 flex gap-2"
              >
                <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Input Section - Before Image Generation */}
        {!isImageLoaded && (
          <motion.div 
            initial={{opacity:0, y:30}}
            animate={{opacity:1, y:0}}
            transition={{duration:0.8, delay:0.6}}
            className="w-full max-w-2xl"
          >
            {!isAuthenticated ? (
              <div className="text-center">
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-4">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">Login Required</h3>
                  <p className="text-yellow-700 mb-4">You need to login to generate and save images to your gallery.</p>
                  <button 
                    onClick={() => setShowLogin(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    Login Now
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className='relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-2'>
                  <input 
                    onChange={e => setInput(e.target.value)} 
                    value={input}
                    type="text" 
                    placeholder='Describe what you want to generate...' 
                    className='w-full bg-transparent outline-none px-6 py-4 text-gray-800 placeholder-gray-500 text-lg font-medium'
                  />
                  <button 
                    type='submit' 
                    disabled={!input.trim() || loading}
                    className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Generating...
                      </div>
                    ) : (
                      'Generate'
                    )}
                  </button>
                </div>
                <p className="text-center text-gray-500 mt-4 text-sm">
                  Try: "A serene mountain landscape at sunset" or "A futuristic city with flying cars"
                </p>
              </>
            )}
          </motion.div>
        )}

        {/* Action Buttons - After Image Generation */}
        {isImageLoaded && (
          <motion.div 
            initial={{opacity:0, y:30}}
            animate={{opacity:1, y:0}}
            transition={{duration:0.8, delay:0.8}}
            className="flex flex-col items-center gap-6"
          >
            {/* Primary action buttons */}
            <div className='flex gap-4 flex-wrap justify-center'>
              <motion.button 
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                onClick={()=>{setIsImageLoaded(false)}} 
                className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full cursor-pointer font-semibold shadow-lg hover:shadow-xl transition-all duration-300'
              >
                Generate Another
              </motion.button>
              
              <motion.button 
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                onClick={()=>{
                  if (isAuthenticated) {
                    navigate('/gallery')
                  } else {
                    toast.error('Please login to view your gallery')
                  }
                }} 
                className='bg-white/80 backdrop-blur-sm border-2 border-blue-200 text-gray-800 px-8 py-4 rounded-full cursor-pointer font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-300'
              >
                {isAuthenticated ? 'View Gallery' : 'Login to View Gallery'}
              </motion.button>
              
              <CustomDropdown 
                format={format} 
                setFormat={setFormat} 
                formats={["JPEG", "PNG", "WebP", "SVG"]}
              />
            </div>
            
            {/* Download button */}
            <motion.div 
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.95}}
              className="relative group"
            >
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  await convertImage(image, format);
                }}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-12 py-4 rounded-full cursor-pointer font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download {format}
              </button>
              
              {/* Success indicator */}
              <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          </motion.div>
        )}

        {/* Footer section */}
        <motion.div 
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{duration:1, delay:1}}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 text-sm">
            Powered by advanced AI technology • Created with ❤️
          </p>
          {!isAuthenticated && (
            <p className="text-blue-600 text-sm mt-2">
              💡 Tip: Login to save your images and view them in your gallery!
            </p>
          )}
        </motion.div>

      </motion.form>
    </div>
  )
}

export default Result
