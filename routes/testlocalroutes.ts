import {Router} from 'express'
import {
  addOne,
  deleteOne,
  getAll,
  getOne,
  editOne,ad
} from "../controllers/localController";
const testLocalRoutes=Router()
testLocalRoutes.get('/',getAll);
// testLocalRoutes
testLocalRoutes.post('/addAd',ad)
testLocalRoutes.get("/add", addOne);
testLocalRoutes.get("/:id", getOne);
testLocalRoutes.get('/edit/:id',editOne);
testLocalRoutes.get("/delete/:id", deleteOne);


 export default testLocalRoutes