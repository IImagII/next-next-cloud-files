import { diskStorage } from 'multer';

//это необходимо для задавания сгенерированного id
const generateId = () =>
  Array(18)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');

//это функция коотрая генерирует имя
const normalizeFileName = (req, file, callback) => {
  const fileExtName = file.originalname.split('.').pop();

  callback(null, `${generateId()}.${fileExtName}`);
};

//тут показвает где сохранять и под каким именем
export const fileStorage = diskStorage({
  destination: './uploads',
  filename: normalizeFileName,
});
