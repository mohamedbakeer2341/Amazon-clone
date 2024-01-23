import multer,{diskStorage} from "multer"

export const filterObj = {
    image:['image/png','image/jpg','image/jpeg'],
    pdf : ['application/pdf'],
}

export const fileUpload = (filterArr)=>{
    const fileFilter = (req,file,cb)=>{
        if(!filterArr.includes(file.mimetype)) return cb(new Error("Invalid file format"),false);
        return cb(null,true);
    }
    return multer({storage:diskStorage({}),fileFilter})
}