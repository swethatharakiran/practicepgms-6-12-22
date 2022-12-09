//axios globals
axios.defaults.headers.common['x-Auth-token']='some token';
// GET REQUEST
function getTodos(){
  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5',{timeout:5000})
   .then(res=>showOutput(res))
   .catch(e=>console.error(e));
}
// POST REQUEST
function addTodo() {
  axios.post('https://jsonplaceholder.typicode.com/todos?_limit=5',{
  
    title: 'New Todo',
    completed:false
  })
  .then(res=>showOutput(res))
  .catch(e=>console.error(e));
}

// PUT/PATCH REQUEST
function updateTodo() {
  axios.patch('https://jsonplaceholder.typicode.com/todos/1',{
    title:'updated to do',
    completed:true
  })
  .then(res=>showOutput(res))
  .catch(e=>console.error(e));
}

// DELETE REQUEST
function removeTodo() {
  axios.delete('https://jsonplaceholder.typicode.com/todos/1')
    .then(res=>showOutput(res))
    .catch(e=>console.error(e));
}

// SIMULTANEOUS DATA
function getData() {
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos'),
    axios.get('https://jsonplaceholder.typicode.com/posts')
  ])
  //.then(res=>{
    //console.log(res[0]);
    //console.log(res[1]);
    //showOutput(res[1]);
  //})
    .then(axios.spread((todos,posts)=>showOutput(posts)))
  .catch(e=>console.error(e));
}

// CUSTOM HEADERS
function customHeaders() {
  const config={
    headers:{
        'content-type':'application/json',
        'Authorization':'Some token'
    }
  }
  axios.post('https://jsonplaceholder.typicode.com/todos/',{
    title:'new todo',
    completed:false
  },config)
  .then(res=>showOutput(res))
  .catch(e=>console.error(e));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options={
    method:'post',
    url:'https://jsonplaceholder.typicode.com/todos/',
    data:{
        title:'hello world'
    },
    transformResponse:axios.defaults.transformResponse.concat(data=>{
        data.title=data.title.toUpperCase();
        return data;
    })
  }
  axios(options).then(res=>showOutput(res));
}

// ERROR HANDLING
function errorHandling() {
  axios.get('https://jsonplaceholder.typicode.com/todoss')
  .then(res=>showOutput(res))
  .catch(e=>{
    if(e.response){
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
        if (e.response.status===404)
        {
            alert('err:page not found');
        }

    }
    else if(e.request){
        console.error(e.request);

    }
    else{
        console.error(e.message);
    }
  });
}

// CANCEL TOKEN
function cancelToken() {
  const source=axios.CancelToken.source();
  axios.get('https://jsonplaceholder.typicode.com/todos',{
    cancelToken:source.token
  })
  .then(res=>showOutput(res))
  .catch(thrown=>{
    if(axios.isCancel(thrown)){
        console.log('request canceled',thrown.message);
    }
  });
  if(true){
    source.cancel('request cancel');
  }
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(config=>{
    console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date()}`);
    return config;
}, err=>{
    return Promise.reject(err);
});

// AXIOS INSTANCES
const axiosinstance=axios.create({
    baseURL:'https://jsonplaceholder.typicode.com'
});
axiosinstance.get('/comments?_limit=5').then(res=>showOutput(res));

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
