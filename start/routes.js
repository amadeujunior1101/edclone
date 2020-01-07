'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route') 


Route.get('/notfound404', 'NotFoundController.index')

Route.group(() => { 

    Route.get('/', 'Auth/UserController.show') 
    Route.get('/subscription-teacher', 'Auth/RegisterController.create')
    Route.get('/subscription-student', 'Auth/RegisterController.create')
    Route.post('/registration/teacher', 'Auth/RegisterController.store').validator('RegisterUser')
    Route.post('/registration/student', 'Auth/RegisterController.store').validator('RegisterUser')

    Route.get('/login', 'Auth/LoginController.create').as('login.create')
    Route.post('/login', 'Auth/LoginController.store').as('login.store').validator('LoginUser')

    Route.get('/register/confirm/:token', 'Auth/RegisterController.confirmEmail')
}).middleware(['guest'])

Route.group(() => { 
    Route.get('/main', 'Auth/UserController.index').as('main.index')
    Route.get('/logout', 'Auth/LoginController.destroy').as('logout')

    Route.post('/add-classe', 'ClasseController.store').as('add-classe.store').validator('NewClasse')
    Route.post('/entry-classe', 'ClasseController.store').as('entry-classe.store').validator('EntryClasse')

    Route.get('/user/profile/:id', 'Auth/ProfileController.show').as('profile.show_profile')
    Route.post('/user/profile/update/:id', 'Auth/ProfileController.update').as('profile.update_profile')

    Route.get('/classe-posts/:id', 'PostController.index').as('classe-posts')
    Route.get('/classe-folders/:id', 'FolderController.index').as('classe-folders')
    Route.get('/classe-members/:id', 'MemberController.index').as('classe-members')
    Route.post('/new-post', 'PostController.store').as('new-post.store').validator('NewPost')

    Route.get('/new-task', 'TaskController.create').as('new-task.create')
    Route.post('/create-task', 'TaskController.store').as('create-task.store').validator('NewTask')
    Route.get('/search-task/:id', 'TaskController.show').as('search-task.show')

    Route.post('/create-task-delivery', 'DeliveryTaskController.store').as('create-task-delivery.store')
    Route.get('/search-task-delivery/:id', 'DeliveryTaskController.show').as('search-task-delivery.show')

    Route.get('/downloadFile/:cod_group/:fileName', 'FileController.show').as('downloadFile.show')
    //Route.get('/fileUpload', 'PostController.create').as('fileUpload.create')
    //Route.post('/importar.js','')
}).middleware(['auth'])





