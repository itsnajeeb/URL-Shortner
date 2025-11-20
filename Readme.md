# URL Shortener Backend API Documentation

This backend provides APIs for creating short URLs, retrieving all URLs, viewing URL details, deleting URLs, and redirecting to the original link.



### Create Short URL

#### `/api/links` Endpoint

## Description
Creates a new short URL by generating a unique short code and saving the original URL.

## HTTP METHOD
`POST`

### Request Body
The Request body should be in JSON format and include the following rules:

-  `original_url` : (string)
- `code` : (string, optional) 

### Example Response
- `message` (Success Message) 
    - `data` (object)
        - `original_url` : (link)
        - `short_code` : (string, optional) 
        - `clicks` : (number) - By default 0
        - `lastClickedAt` : (number) - By default null
        
    - `short_url` : (link) 




## Get All Short URLs

#### `/api/links`  Endpoint

### Description

Fetches the list of all URLs saved in the database.

### HTTP Method

`GET` 

### Example Response
- `success`: (true) 
- `count` : (no of documents) 
    - `data` (array)
        - `original_url` : (link)
        - `short_code` : (string, optional) 
        - `clicks` : (number) - By default 0
        - `lastClickedAt` : (number) - By default null
        

## View Details of Specific Short URL

#### `/api/code/:code` Endpoint

### Description 

Retrieves all information about a specific short URL (original URL, clicks, code, last clicked, etc.).

### HTTP Method
`GET`


### Example Response
- `message` (Success Message) 
    - `data` (object)
        - `original_url` : (link)
        - `short_code` : (string, optional) 
        - `clicks` : (number) - By default 0
        - `lastClickedAt` : (number) - By default null
        
    - `short_url` : (link) 


## Delete Short URL

#### `/api/code/:code` Endpoint

### Description 
Deletes a short URL from the database.

### HTTP Method
`DELETE`


### Example Response
- `message` (Success Message) 

 
## Redirect to Original URL

#### `/:code` Endpoint

### Description 

Redirects the user to the original URL associated with the given short code.
### HTTP Method
`GET`


### Example Response
- `You will redirect to original url`

<br/>
<br/>
<br/>

# How to Test APIs

## Using Postman

### Create Short URL
- `POST http://localhost:3000/api/links`
- BODY -> JSON

### View All URLs
- `GET http://localhost:3000/api/links`

### Get URL Details
- `GET http://localhost:3000/api/code/:code`

### Delete  URL
- `DELETE http://localhost:3000/api/code/:code`

### Test Redirect
`Paste in browser`

`http://localhost:3000/<SHORT_CODE>`



