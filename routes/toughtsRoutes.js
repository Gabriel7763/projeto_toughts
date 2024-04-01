const express = require('express')
const router = express.Router()

// helpers
const checkAuth = require('../helpers/auth').checkAuth
// controller
const ToughtController = require('../controllers/ToughtController')

router.get('/add', checkAuth, ToughtController.createTought)
router.post('/add', checkAuth, ToughtController.createToughtSave)
router.get('/dashboard', checkAuth, ToughtController.dashboard)
router.get('/edit/:id', checkAuth, ToughtController.UpdateTought)
router.post('/edit', checkAuth, ToughtController.UpdateToughtSave)
router.post('/remove', checkAuth, ToughtController.removeTought)
router.get('/', ToughtController.showThoughts)

module.exports = router