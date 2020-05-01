const express = require ('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const moment = require('../libs/timeLib')
const response = require('../libs/responseLib')
const check = require('../libs/checkLib')
const logger = require('../libs/loggerLib')

//importing the model here
const BlogModel= mongoose.model('Blog')

let getAllBlog =(req,res) =>
{
    BlogModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err,result)=> {
            if(err){
                console.log(err);
                logger.error(err.message,'BlogController:AllBlog',10)
                let apiResponse = response.generate(true,'failed to find blog details',500,null);
                res.send(apiResponse);
            }else if(check.isEmpty(result)) {
                console.log('no blog found');
                logger.info('No Blog Found','BlogController:AllBlog')
                let apiResponse = response.generate(true,'No Blog  found',404,null);
                res.send(apiResponse);
            }else {
                logger.info('All Blog Details Found','Blog Controller:getAllBlog',0);
                let apiResponse = response.generate(false,'All Blog Details Found',200,result);
                res.send(apiResponse)
            }
        })
}//end get all blog

//function to read a single blog

let viewByBlogId =(req,res) => {
    console.log(req.user)
    BlogModel.findOne({'blogId':req.params.blogId},(err,result) =>{

        if(err) {
            console.log(err)
            logger.error(`Error Occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(true,'failed to find blog details',500,null);
            res.send(apiResponse);
        }else if (check.isEmpty(result)){
            logger.info('no blog found','BlogController:ViewByBlogId',5);
            logger.info('No Blog Found','Database',5)
            let apiResponse = response.generate(true,'No Blog  found',404,null);
            res.send(apiResponse);
        }else {
            logger.info("Blog found successfully","BlogController:ViewBlogById",5)
            let apiResponse = response.generate(false,'Blog Details Found',200,result);
            res.send(apiResponse)
        }
    } )
}//end of get blog by id


let viewByAuthor=(req,res) =>{

    if (check.isEmpty(req.params.author)) {

        console.log('author should be passed')
        let apiResponse = response.generate(true, 'author is missing', 403, null)
        res.send(apiResponse)
    }else {    
        BlogModel.findOne({'author':req.params.author},(err,result) =>{
            if(err){
                console.log(err)
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true,'failed to find blog details',500,null);
                res.send(apiResponse);
            }else if (check.isEmpty(result)){
                console,log('no blog found');
                let apiResponse = response.generate(true,'No Blog  found',404,null);
                res.send(apiResponse);
            }else {
                let apiResponse = response.generate(false,'Blog Details Found',200,result);
                res.send(apiResponse)

            }
        })
    } 
}

let viewByCategory=(req,res) =>{
    if (check.isEmpty(req.params.categoryId)) {

        console.log('categoryId should be passed')
        let apiResponse = response.generate(true, 'CategoryId is missing', 403, null)
        res.send(apiResponse)
    } else {
        BlogModel.findOne({'category':req.params.category},(err,result)=>{
            if(err){
                console.log(err)
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true,'failed to find blog details',500,null);
                res.send(apiResponse);
            }else if (check.isEmpty(result)){
                console,log('no blog found');
                let apiResponse = response.generate(true,'No Blog  found',404,null);
                res.send(apiResponse);
            }else {
                let apiResponse = response.generate(false,'Blog Details Found',200,result);
                res.send(apiResponse)

            }
       })
    }   
}
    /*edited by Author*/
let editBlog =(req,res) => {
    
    if (check.isEmpty(req.params.blogId)) {

        console.log('blogId should be passed')
        let apiResponse = response.generate(true, 'blogId is missing', 403, null)
        res.send(apiResponse)
    } else {
            let options =req.body;
            console.log(options);

            BlogModel.update({'blogId':req.params.blogId},options,{multi:true}).exec((err,result)=> {

                if(err){
                    console.log(err)
                    logger.error(`Error Occured : ${err}`, 'Database', 10)
                    let apiResponse = response.generate(true,'failed to find blog details',500,null);
                    res.send(apiResponse);
                }else if (check.isEmpty(result)){
                    console.log('no blog found');
                    let apiResponse = response.generate(true,'No Blog  found',404,null);
                    res.send(apiResponse);
                }else {
                    let apiResponse = response.generate(false,'Blog edit successfull',200,result);
                    res.send(apiResponse)

                }
            })
        }       
}

/* function to delete the assignment collection.
 */
let deleteBlog = (req, res) => {

    if (check.isEmpty(req.params.blogId)) {

        console.log('blogId should be passed')
        let apiResponse = response.generate(true, 'blogId is missing', 403, null)
        res.send(apiResponse)
    } else {
            BlogModel.remove({ 'blogId': req.params.blogId }, (err, result) => {
                if (err) {
                    console.log(err)
                    logger.error(`Error Occured : ${err}`, 'Database', 10)
                    let apiResponse = response.generate(true,'failed to find blog details',500,null);
                    res.send(apiResponse);
                } else if (check.isEmpty(result)) {
                    let apiResponse = response.generate(true,'No Blog  found',404,null);
                    res.send(apiResponse);
                } else {
                    let apiResponse = response.generate(false,'Blog deletion successfull',200,result);
                    res.send(apiResponse)

                }
            })
        }   
}

/*creating a blog*/
let createBlog = (req, res) => {
    let blogCreationFunction = () => {
        return new Promise((resolve, reject) => {
            console.log(req.body)
            if (check.isEmpty(req.body.title) || check.isEmpty(req.body.description) || check.isEmpty(req.body.blogBody) || check.isEmpty(req.body.category)) {

                console.log("403, forbidden request");
                let apiResponse = response.generate(true, 'required parameters are missing', 403, null)
                reject(apiResponse)
            } else {
                        var today = Date.now()
                        let blogId = shortid.generate()

                        let newBlog = new BlogModel({

                            blogId: blogId,
                            title: req.body.title,
                            description: req.body.description,
                            bodyHtml: req.body.blogBody,
                            isPublished: true,
                            category: req.body.category,
                            author: req.body.fullName,
                            created: today,
                            lastModified: today
                        }) // end new blog model
                    

                        let tags = (req.body.tags != undefined && req.body.tags != null && req.body.tags != '') ? req.body.tags.split(',') : []
                        newBlog.tags = tags

                        newBlog.save((err, result) => {
                            if (err) {
                                console.log(err)
                                logger.error(`Error Occured : ${err}`, 'Database', 10)
                                let apiResponse = response.generate(true,'failed to find blog details',500,null);
                                res.send(apiResponse);
                            } else {
                                console.log('Success in blog creation')
                                    resolve(result)

                            }
                        })  // end new blog save
            }    
        })    
    }

    // making promise call.
    blogCreationFunction()
        .then((result) => {
            let apiResponse = response.generate(false, 'Blog Created successfully', 200, result)
            res.send(apiResponse)
        })
        .catch((error) => {
            console.log(error)
            res.send(error)
        })
}

/*function to increase views of a blog.
 */
let increaseBlogView = (req, res) => {

    if (check.isEmpty(req.params.blogId)) {
    
        console.log('blogId should be passed')
        let apiResponse = response.generate(true, 'blogId is missing', 403, null)
        res.send(apiResponse)
    } 
     else {

                BlogModel.findOne({ 'blogId': req.params.blogId }, (err, result) => {

                    if (err) {
                        console.log(err)
                        logger.error(`Error Occured : ${err}`, 'Database', 10)
                        let apiResponse = response.generate(true,'failed to find blog details',500,null);
                        res.send(apiResponse);
                    } else if (check.isEmpty(result)) {
                        console.log('No Blog Found')
                        let apiResponse = response.generate(true,'No Blog  found',404,null);
                        res.send(apiResponse);
                    } else {
                        
                        result.views += 1;
                        result.save(function (err, result) {
                            if (err) {
                                console.log(err)
                                let apiResponse = response.generate(true,'failed to find blog details',500,null);
                                res.send(apiResponse);
                            }
                            else {
                                console.log("Blog updated successfully")
                                let apiResponse = response.generate(false,'Blog Updation successfull',200,result);
                                res.send(apiResponse)

                            }
                        });// end result
                    }
               })
     }   
}

/* let testRoute =(req,res) =>{

//     console.log(res);
//     res.send(req.params);
// } //end test

// let testQuery = (req,res) =>{
//     console.log(req.query);
//     res.send(req.query);
// }

// let testBody =(req,res) => {
//     console.log(req.body);
//     res.send(req.body);
// }

//let helloWorld = (req,res) =>res.send('hello world');
//let PrintExample =(req,res)=>res.send("print example");
*/
module.exports = {
/*helloWorld : helloWorld,
//PrintExample : PrintExample
testRoute :testRoute,
testQuery:testQuery,
testBody:testBody
*/

    getAllBlog: getAllBlog,
    createBlog: createBlog,
    viewByBlogId: viewByBlogId,
    viewByCategory: viewByCategory,
    viewByAuthor: viewByAuthor,
    editBlog: editBlog,
    deleteBlog: deleteBlog,
    increaseBlogView: increaseBlogView
}


