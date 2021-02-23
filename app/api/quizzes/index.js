const { Router } = require('express')

const { Quiz } = require('../../models')


const router = new Router()

router.get('/', (req, res) => {
  try {
    res.status(200).json(Quiz.get())
    console.log(Quiz.params)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:quizId', (req, res) => {
  try {
    const quiz = Quiz.getById(req.params.quizId)
    console.log(req.params)
    res.status(200).json(quiz)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(400)
        .json(err.extra)
    } else {
      res.status(500)
        .json(err)
    }
  }
})

router.post('/', (req, res) => {
  try {
    const quiz = Quiz.create({ ...req.body })
    res.status(201).json(quiz)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.delete('/:quizId', (req, res) => {
  try {
    Quiz.delete(req.params.quizId)
    res.status(204).end()
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(400)
        .json(err.extra)
    } else {
      res.status(500)
        .json(err)
    }
  }
})

router.put('/:quizId', (req, res) => {
  try {
    res.status(200).json(Quiz.update(req.params.quizId, req.body))
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400)
        .json(err.extra)
    } else {
      res.status(500)
        .json(err)
    }
  }
})

module.exports = router
