const express = require('express')
const blogController = require('./../controllers/blogController')
const appConfig = require('./../config/appConfig');
const auth = require("./../middlewares/auth");


let setRouter = (app) => {

    let baseUrl = appConfig.apiVersion + '/blogs';
    app.get(baseUrl + '/all',auth.isAuthenticated, blogController.getAllBlog);
    /**
	 * @api {get} /api/v1/blogs/all Get all blogs
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "All Blog Details Found",
	    "status": 200,
	    "data": [
					{
						blogId: "string",
						title: "string",
						description: "string",
						bodyHtml: "string",
						views: number,
						isPublished: boolean,
						category: "string",
						author: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Blog Details",
	    "status": 500,
	    "data": null
	   }
	 */


    app.get(baseUrl + '/view/:blogId',auth.isAuthenticated, blogController.viewByBlogId);
     /**
	 * @api {get} /api/v1/blogs/view/:blogId Get a single blog
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} blogId The blogId should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Blog Found Successfully.",
	    "status": 200,
	    "data": {
	    			_id: "string",
	    			__v: number
					blogId: "string",
					title: "string",
					description: "string",
					bodyHtml: "string",
					views: number,
					isPublished: boolean,
					category: "string",
					author: "string",
					tags: object(type = array),
					created: "date",
					lastModified: "date"
				}
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */


    app.get(baseUrl + '/view/by/author/:author',auth.isAuthenticated, blogController.viewByAuthor);
     /**
	 * @api {get} /api/v1/blogs/view/by/author/:author Get blogs by author
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} author author of the blog passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Blogs Found Successfully.",
	    "status": 200,
	    "data": [
					{
						blogId: "string",
						title: "string",
						description: "string",
						bodyHtml: "string",
						views: number,
						isPublished: boolean,
						category: "string",
						author: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */


    app.get(baseUrl + '/view/by/category/:category',auth.isAuthenticated, blogController.viewByCategory);
    /**
	 * @api {get} /api/v1/blogs/view/by/category/:category Get blogs by category
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} category category of the blog passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Blogs Found Successfully.",
	    "status": 200,
	    "data": [
					{
						blogId: "string",
						title: "string",
						description: "string",
						bodyHtml: "string",
						views: number,
						isPublished: boolean,
						category: "string",
						author: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */


    app.post(baseUrl + '/:blogId/delete',auth.isAuthenticated, blogController.deleteBlog);
    /**
	 * @api {post} /api/v1/blogs/:blogId/delete Delete blog by blogId
	 * @apiVersion 0.0.1
	 * @apiGroup delete
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} blogId blogId of the blog passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Blog Deleted Successfully",
	    "status": 200,
	    "data": []
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */


    app.put(baseUrl + '/:blogId/edit',auth.isAuthenticated, blogController.editBlog);
       /**
	 * @api {put} /api/v1/blogs/:blogId/edit Edit blog by blogId
	 * @apiVersion 0.0.1
	 * @apiGroup edit
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} blogId blogId of the blog passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Blog Edited Successfully.",
	    "status": 200,
	    "data": [
					{
						blogId: "string",
						title: "string",
						description: "string",
						bodyHtml: "string",
						views: number,
						isPublished: boolean,
						category: "string",
						author: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */



    app.post(baseUrl + '/create',auth.isAuthenticated, blogController.createBlog);
    /**
     * @api {post} /api/v1/blogs/create/ Create blog
     * @apiVersion 0.0.1
     * @apiGroup create
     * 
     * @apiparam (String) authToken  The Token for authentication.(Send authToken as query parametrr)
     * @apiparam (String) title title of blog passed as body parameter.
     * @apiparam (String) description description of blog passed as body parameter.
     * @apiparam (String) blogBody blogBody of blog passed as body parameter
     * @apiparam (String) category category of blog passed as body parameter
     * 
     * 
     * @apiSuccessExample {json} Success-Ressponse:
     * {
	    "error": false,
	    "message": "Blog Created successfully",
	    "status": 200,
	    "data": [
					{
						blogId: "string",
						title: "string",
						description: "string",
						bodyHtml: "string",
						views: number,
						isPublished: boolean,
						category: "string",
						author: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

    app.get(baseUrl + '/:blogId/count/view',auth.isAuthenticated, blogController.increaseBlogView);

    /**
	 * @api {get} /api/v1/blogs/:blogId/count/view Increase Blogs Count
	 * @apiVersion 0.0.1
	 * @apiGroup update
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} blogId blogId of the blog passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Blog Updated Successfully.",
	    "status": 200,
	    "data": [
					{
						blogId: "string",
						title: "string",
						description: "string",
						bodyHtml: "string",
						views: number,
						isPublished: boolean,
						category: "string",
						author: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */




}// end setRouter function 



/*app.get('/test/route/:param1/:param2',blogController.testRoute);
app.get('/test/query',blogController.testQuery);
app.post('/test/body',blogController.testBody);*/
// end router functin

module.exports = {

    setRouter: setRouter
    

}