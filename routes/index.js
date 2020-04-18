let router = require('express').Router();
let QuestionModel = require('../models/Question');
let AnswerModel = require('../models/Answer');


const success  = (res, data, message) => {
    res.status(200).json({
        status : 200,
        message : message || 'Successfully',
        data : data
    });
};

const fail = (res, message) => {
    res.status(200).json({
        status : 400,
        message : message || 'Failed'
    });
};

// Create a new question
router.route('/question/add')
    .post((req, res) => {
        let newQuestion = new QuestionModel(req.body);
        newQuestion.save().then((question) => {
            if(!question) {
                return fail(res, 'Fail create question');
            }
            return success(res, question, 'Successfully create question')
        }).catch((err) => {
            return fail(res, err.message);
        });
    });


// Retrieve the list of questions
router.route('/questions')
    .get((req, res) => {
        QuestionModel.find().then((questions) => {
            if(!questions){
                return fail(res, 'Fail get all questions');
            }
            return success(res, questions, 'Successfully create question')
        }).catch((err) => {
            return fail(res, err.message);
        });
    });

router.route('/question/:questionId')
    .all((req, res, next) => {
        if(!require('mongoose').Types.ObjectId.isValid(req.params.questionId)){
            return fail(res, 'Invalid question id');
        }
        next();
    })
    // Get all answers for this specific question
    .get((req, res) => {
        AnswerModel.find({_questionId: req.params.questionId}).then((answers) => {
            if(!answers){
                return fail(res, 'Fail get all answer using question id');
            }
            return success(res, answers, 'Successfully create question')
        }).catch((err) => {
            return fail(res, err.message);
        })
    })
    .post((req, res) => {
        req.body._questionId = req.params.questionId;
        let newAnswer = new AnswerModel(req.body);
        newAnswer.save().then((answer) => {
            if(!answer) {
                return fail(res, 'Fail create answer');
            }
            return success(res, answer, 'Successfully create answer')
        }).catch((err) => {
            return fail(res, err.message);
        });
    });


module.exports = router;
