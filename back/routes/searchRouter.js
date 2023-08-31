const Router=require('express')
const routes = require('../routes')
const {searchController}=require('../controllers/searchController')
const router= new Router()
router.post(routes.search.get,searchController)
module.exports=router