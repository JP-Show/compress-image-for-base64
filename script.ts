const button = document.getElementById('button')
button!.addEventListener('click', () => prepareForSend())

const inputFile = document.getElementById('inputFile')
const imageModel = new Image()
const fileReader = new FileReader()
let sourceFile: File

inputFile?.addEventListener('change', (e:Event) => sourceFile = (e.target as HTMLInputElement).files![0] )

//this is an example how to use
async function prepareForSend (){
  const image:string = await  compressImage(sourceFile, imageModel, fileReader)
  document.getElementById('textI')!.innerHTML = image

}


// this function going to check a file if is null and if isn't going to return an object
function checkFile(file: File | null): File{
  if(file == null){
    throw 'file is null'
  }
  return file
}

// this function going to verify if it's jpg, jpeg or png
function verifyIfImage(object:File):File{
 if(object.type.endsWith("/jpeg") == false || !object.type.endsWith("/jpg") == false|| !object.type.endsWith("/png") == false){
  throw 'please, only jpeg, jpg or png'
 }
 return object
}
//this function going to convert an image for base64 image
async function convertImage64(fileSource: File, fileReader: FileReader):Promise<string> {
    fileReader.readAsDataURL(fileSource)
    const imageBase64:string = await new Promise((resolve)=>{fileReader.onload = e =>
      resolve(String(e.target?.result))
    }
    )
    return imageBase64
}
//this function going to compress base64 image
async function compressImage64(sourceImg:string, HEIGHT:number, newImage: HTMLImageElement):Promise<string> {
      newImage.src = sourceImg
      const FinalImg: string = await new Promise(resolve => {
        newImage.onload = event => {
          const canvas: HTMLCanvasElement = document.createElement('canvas')
          const ratio = HEIGHT / (event.target as HTMLImageElement).height
          canvas.height = HEIGHT
          canvas.width = (event.target as HTMLImageElement).width * ratio
  
          const context: CanvasRenderingContext2D = canvas.getContext('2d')!
          context?.drawImage(newImage, 0, 0, canvas.width, canvas.height)
  
          const newImageURL = context.canvas.toDataURL(
            'image/jpeg' || 'image/jpg' || 'image/png',
            90
          )
  
          resolve(newImageURL)
        }
      })

      return FinalImg
    }
//this function pick all function e return image in base64
async function compressImage(sourceFile:  File | null, imageModel: HTMLImageElement, fileReader: FileReader):Promise<string> {
  try{
    const object:File = checkFile(sourceFile)
    const image:File = verifyIfImage(object)
    const imageInBase64:string = await convertImage64(image,fileReader)
    const base64Compress:string = await compressImage64(imageInBase64, 800, imageModel)
    return base64Compress
  }catch(error){
    alert(error)
  }
return ''
}