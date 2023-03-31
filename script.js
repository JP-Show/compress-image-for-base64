"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const button = document.getElementById('button');
button.addEventListener('click', () => prepareForSend());
const inputFile = document.getElementById('inputFile');
const imageModel = new Image();
const fileReader = new FileReader();
let sourceFile;
inputFile === null || inputFile === void 0 ? void 0 : inputFile.addEventListener('change', (e) => sourceFile = e.target.files[0]);
//this is an example how to use
function prepareForSend() {
    return __awaiter(this, void 0, void 0, function* () {
        const image = yield compressImage(sourceFile, imageModel, fileReader);
        document.getElementById('textI').innerHTML = image;
    });
}
// this function going to check a file if is null and if isn't going to return an object
function checkFile(file) {
    if (file == null) {
        throw 'file is null';
    }
    return file;
}
// this function going to verify if it's jpg, jpeg or png
function verifyIfImage(object) {
    if (object.type.endsWith("/jpeg") == false || !object.type.endsWith("/jpg") == false || !object.type.endsWith("/png") == false) {
        throw 'please, only jpeg, jpg or png';
    }
    return object;
}
//this function going to convert an image for base64 image
function convertImage64(fileSource, fileReader) {
    return __awaiter(this, void 0, void 0, function* () {
        fileReader.readAsDataURL(fileSource);
        const imageBase64 = yield new Promise((resolve) => {
            fileReader.onload = e => { var _a; return resolve(String((_a = e.target) === null || _a === void 0 ? void 0 : _a.result)); };
        });
        return imageBase64;
    });
}
//this function going to compress base64 image
function compressImage64(sourceImg, HEIGHT, newImage) {
    return __awaiter(this, void 0, void 0, function* () {
        newImage.src = sourceImg;
        const FinalImg = yield new Promise(resolve => {
            newImage.onload = event => {
                const canvas = document.createElement('canvas');
                const ratio = HEIGHT / event.target.height;
                canvas.height = HEIGHT;
                canvas.width = event.target.width * ratio;
                const context = canvas.getContext('2d');
                context === null || context === void 0 ? void 0 : context.drawImage(newImage, 0, 0, canvas.width, canvas.height);
                const newImageURL = context.canvas.toDataURL('image/jpeg' || 'image/jpg' || 'image/png', 90);
                resolve(newImageURL);
            };
        });
        return FinalImg;
    });
}
//this function pick all function e return image in base64
function compressImage(sourceFile, imageModel, fileReader) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const object = checkFile(sourceFile);
            const image = verifyIfImage(object);
            const imageInBase64 = yield convertImage64(image, fileReader);
            const base64Compress = yield compressImage64(imageInBase64, 800, imageModel);
            return base64Compress;
        }
        catch (error) {
            alert(error);
        }
        return '';
    });
}
