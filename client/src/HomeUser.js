import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter , Form, FormGroup, Label, Input, FormText  } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import './css/App.css';
import Navbar from './Navbar';
import CheckboxTree from 'react-checkbox-tree';
import File from "./components/File"
import Folder from "./components/Folder"
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { MDBProgress } from 'mdbreact';


let aes256 = require('aes256');
let arrFile = []
class App extends Component {
  state = {
    childrens: [],
    aux:"aux",
    modalNewFolder: false,
    listOfChildren:[],
    key: "my passphrase;",
    here: {},
    nameEncrypted:"",
    portaPapel:{},
    modalKey: false,
    modalNewKey:false,
    contentF:"",
    nameF:"",
    nodes :[{
      value: 'mars',
      label: 'Home',
      children: [
        { 
        value: 'phobos', 
        label: 'Esto tampoco ' 
        },
        { 
         value: 'deimos', 
         label: 'No es tuyo :(' ,
         children: [
          { 
          value: 'phobos2', 
          label: 'Phobos2' 
          },
          { 
           value: 'deim', 
           label: 'Deim' ,
           children: [
            { 
            value: 'phobos3', 
            label: 'Phobos3' 
            },
            { 
            value: 'phobos4', 
            label: 'Phobos4' 
            },
            { 
             value: 'deimo', 
             label: 'Deimos3',
             children: []
             
            }
          ]
           
          }
        ]
        }
      ]
    }]
  };
  componentWillMount() {
 
    console.log("this.state.nodes[0]")
    this.setState({here:this.state.nodes[0]});
    console.log("ID CLIENT",sessionStorage.getItem('id'))
    
   fetch('/folder/F'+sessionStorage.getItem('id'), { // Your POST endpoint
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(["h","h"])
    })
    .then((response) => response.json())
    .then((data) => {console.log(data);
      if(data.r==="nuevo"){
        this.clickInNewKey();
      }else{
        this.clickInKey();
      }
    })
    .catch(function() {
      console.log("error in post data");
    });
  //    this.setState({here:
  //     { value: 'mars',
  //     label: 'Home',
  //     isFolder:true,
  //     children: [
  //       { value: 'mars1',
  //     label: 'Home1',
  //     isFolder:true,
  //     children: [
        
  //     ]  
  //     }
  //     ]  
  //     }
  // })

  
  }
  inicio = async () => {
    await this.setState({nodes: [{ value: 'mars',
    label: 'Home',
    isFolder:true,
    children: [
      { value: 'mars1',
    label: 'Home1',
    isFolder:true,
    children: [
      
    ]  
    }
    ]  
    }]})
    console.log(this.state.nodes)
  }

  newKey = async () => {
    var key = document.getElementById("newKey").value;
    var repeatKey = document.getElementById("repeatkey").value;
    if(key===repeatKey){
      this.setState({key:key})
      var newObj=[{
        value: 'root',
        label: 'root',
        isFolder : true,
        children: [
          {
            value: 'home',
            label: 'Home',
            isFolder : true,
            children: []
          }
        ]
      }]
      this.setState({nodes:newObj})
      await this.saveNewJson(newObj,key)
      await this.callJSON(key)
      this.clickInNewKey()
    }else{
      alert("las claves fueron diferentes, intentelo de nuevo")
    }
  }

  asingKey = async ( ) => {
    var key = document.getElementById("key").value;
    this.setState({key:key})
    await this.callJSON(key)
  }
  componentDidMount() {
   //this.inicio()
   
   
    // console.log(JSON.stringify(this.state.nodes[0]))
    // fetch('api/prueba', { // Your POST endpoint
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify(this.state.nodes)
    //   })
    //   .then((response) => response.json())
    //   .then((data) => {console.log(data)})
    //   .catch(function() {
    //     console.log("error in post data");
    //   });
    
   
  }

 sendJson = () => {
  fetch('api/createFolder', { // Your POST endpoint
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(this.state.nodes)
    })
    .then((response) => response.json())
    .then((data) => {console.log(data)})
    .catch(function() {
      console.log("error in post data");
    });

 }

 search = (path, obj, target) => {
    for (var k in obj) {
      //console.log("k",k)
        if (obj.hasOwnProperty(k))//si esta el atributo k en el objeto
            if (obj[k] === target)
                return path + "," + k 
            else if (typeof obj[k] === "object") {
                var result = this.search(path + "," + k , obj[k], target);
                if (result)
                    return result;
            }
    }
    return false;
}

  clickInLoad = () => {
    document.getElementById("inputUpload").click();
    let UpdFile = document.getElementById("inputUpload");
    UpdFile.addEventListener('change',this.handleFileSelect, false);
  }

  callFile = async (value,label) => {
    const response = await fetch('/api/getFile/'+value+'/F'+sessionStorage.getItem('id'));
    const body = await response.blob();
    if (response.status !== 200){
      console.log("ERRORRR")
      alert("Por favor intente de nuevo")
    }
    let key = this.state.key
    let fileReader = new FileReader();
    let content;
    let filename=label;
    fileReader.onloadend =  async function  (e){

       content = aes256.decrypt(key,fileReader.result);
      console.log("contentdes", content);
      var fileDown =[];
      
      fileDown[0]=content;
      fileDown[1]=filename;

        await fetch('api/postForDownload', { // Your POST endpoint
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ "file": {
          "content" : content,
          "name" : filename
        }}) // This is your file object
        }).then(response =>{
          //console.log(response.blob)
          //download("hola",'hola.txt')
         
        })
        .catch(function() {
          console.log("error in post data");
        });
     // download(content,filename,"js");
        
    }
    fileReader.readAsText(body);
    this.setState({contentF:content})
    this.setState({nameF:filename})
    console.log(filename)
    this.downloadFile(filename);
  };


  downloadFile  = async (filename) => {
    var ret = window.location.href.replace('https://','');
    ret = ret.replace(':3000/homeUser','');
    setTimeout(function() {
    window.open('http://'+ret +':5000/download/'+filename)
}, 1000);

   
  }
  
  handleFileSelect = (evt) => {
    if(evt.target.files.length>0){
      var files = evt.target.files; // FileList object
      console.log("llamo")
      this.postContentFile(files);
      
    }
  }
  postContentFile = async (files) =>{
    let flagError=false;
    
      var formData = new FormData();
      //formData.set('files', files);
      console.log("FILEEES",files[0])
      formData.append('files', files[0]);
      console.log("entro", formData)
      await fetch('api/postContentFile', { // Your POST endpoint
      method: 'POST',
      body: formData // This is your file object
      }).catch(function() {
        console.log("error in post data");
        flagError=true;
      });
    
    this.getContentFile(files,flagError);
  }

  getContentFile = async (files,flagError) =>{
    this.setState({nameF:files[0].name})
    console.log("name hereee",this.state.nameF)
    let response;
    arrFile[0] = files[0].name;
    sessionStorage.setItem('a', files[0].name);
     response = await fetch('api/getContentFile?name='+files[0].name).catch(function() {
			console.log("error in get files");
			flagError=true;
      });
      if(response.status == 500){
        console.log("ERROR 500000000")
        alert("SERVER ERROR 500, porfavor ELIMINE el archivo e intente de nuevo o recarge la pestaNa")
        flagError=true;
      }else{
        if(!flagError){
          console.log("respuesta",response)
        let json = await response.json();
  
          let key = this.state.key;
           setTimeout(async () => {
            var filename = files[0].name;
            console.log("json",json)
            this.setState({nameF:filename});
            
            // var contentEncrypted = aes256.encrypt(key, contentString);
            var contentEncrypted = aes256.encrypt(key, json)
            var nameEncrypted = aes256.encrypt(key, filename);
            
           
              if(nameEncrypted.includes("/")){
                var re = new RegExp("/", 'g');

		nameEncrypted = nameEncrypted.toString().replace(re, "-");
                console.log("removido el /", nameEncrypted)                
              }
            

            setTimeout( 
              function() {
                //nameEncrypted = nameEncrypted.toString().replace(":", "\/");
                //
                /* create file encrypt */
                console.log("PRUEBAA FILEE NAMEE", nameEncrypted)
                 fetch('api/file1/F'+sessionStorage.getItem('id'), { // Your POST endpoint
                  method: 'POST',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({ "file": {
                    "content" : contentEncrypted,
                    "name" : nameEncrypted
                  }})  // This is your file object
                }).catch(function() {
                  console.log("error in post data");
                  flagError=true;
                });
                this.setState({nameEncrypted:nameEncrypted})
              }
              .bind(this),
              1000
            ); 
            
            
          }, 600);
        }
      }
			
  }

  selected = (clicked) => {
    if(clicked.isParent){
      this.setState({childrens:clicked.children});
      var objHere = {}
      for (var i =0; i<clicked.parent.children.length; i++){
        if (clicked.parent.children[i].value === clicked.value){ //find parent element
          objHere=clicked.parent.children[i].value;
        }
      }
      this.setState({here:objHere});
    }else{
      console.log("hoja")
    }
  }

  clickInNewFolder= () => {
    this.setState(prevState => ({
      modalNewFolder: !prevState.modalNewFolder
    }));
  }

  clickInKey= () => {
    this.setState(prevState => ({
      modalKey: !prevState.modalKey
    }));
  }
  clickInNewKey= () => {
    this.setState(prevState => ({
      modalNewKey: !prevState.modalNewKey
    }));
  }

  createFolder= () => {
    var newName = document.getElementById("newFolder").value;
    this.setState(prevState => ({
      modalNewFolder: !prevState.modalNewFolder
    }));
    var path = "nodes";
    console.log("AQUI PRUEBA",this.state.nodes )
    path = this.search(path, this.state.nodes, this.state.here);
    let newObj = {
      value: aes256.encrypt(this.state.key, newName),
      label: newName,
      isFolder:true,
      children: []
    }
    let flagFolderHome = false;
    console.log("path",path)
    console.log("newobj", newObj)
    path = path.replace("['value']","");
    path = path.replace("nodes,0,","");
    if(path.includes('nodes,0')){
      flagFolderHome=true;
    }
    console.log("path2",path)
    var auxSubPaths= path.split(',')
    console.log("auxSubPaths",auxSubPaths)
    var subPaths = ""
    var x=0;
     for(var i=0; i<auxSubPaths.length;i++){
      if(/^\d+$/.test(auxSubPaths[i+1])){
        if(i===0){
          subPaths=auxSubPaths[i]+"["+auxSubPaths[i+1]+"]"
        }else{
          subPaths=subPaths+"."+auxSubPaths[i]+"["+auxSubPaths[i+1]+"]"
        }      
        i++;
        x++;
      } //if string is num
     }

      var data = this.state.nodes[0];
      console.log("subpth", subPaths)
      if(flagFolderHome){
        eval("data.children[data.children.length]= newObj")
      }else{
        eval("data."+subPaths+".children[data."+subPaths+".children.length]= newObj")
      }
      //this.setState({nodes:data})

      setTimeout( 
        function() {
        this.saveJson()
        }
        .bind(this),
        3000
      ); 

  }

  changeHere= (children) => {
    console.log("childrenhere", children)
   this.setState({here:children})
  }

  clickInBefore = () => {
    var path = "nodes";
    path = this.search(path, this.state.nodes, this.state.here);
    let flagHome=false;
    console.log("path",path)
    let flagFolderHome = false;
    path = path.replace("['value']","");
    path = path.replace("nodes,0,","");
    if(path.includes('nodes,0')){
      flagFolderHome=true;
    }
    console.log("path2",path)
    path = path.replace("nodes,","");
    var auxSubPaths= path.split(',')
    
    var subPaths = ""
    var x=0;
     for(var i=0; i<auxSubPaths.length;i++){
      if(/^\d+$/.test(auxSubPaths[i+1])){
        if(i===0){
          subPaths=auxSubPaths[i]+"["+auxSubPaths[i+1]+"]"
        }else{
          subPaths=subPaths+"."+auxSubPaths[i]+"["+auxSubPaths[i+1]+"]"
        }      //var newName = document.getElementById("newFolder").value;
        i++;
        x++;
      } //if string is num
     }
     console.log("NODESSS",this.state.nodes[0])
     console.log("SubPaths",subPaths)
     var arr = subPaths.split(".");
     subPaths=""
     console.log("arrr",arr)
     if(flagFolderHome){
      flagHome=true;
      alert("Estas en el home")
     }else{
      for(var i = 0; i<arr.length-1; i++){
        if (i===0){
          console.log("PASEEEE")
          subPaths = subPaths.concat(arr[i])
        }else{
          subPaths = subPaths.concat("."+arr[i])
        }
      } console.log("SUBPATHSSSSSSS",subPaths)
      if(arr.length==1){
       
        eval("this.setState({here:this.state.nodes[0]})")
      }else{
        eval("this.setState({here:this.state.nodes[0]."+subPaths+"})")
      }
      
     }
     console.log("SubPaths2",subPaths)
     
  }

  saveJson= async (children) => {
    let msj=aes256.encrypt(this.state.key, JSON.stringify(this.state.nodes))
    console.log("msj",msj)

          await fetch('api/file1/F'+sessionStorage.getItem('id'), { // Your POST endpoint
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ "file": {
              "content" : msj,
              "name" : "kYS1cBJ6oqukp0KTeDScD7XHvh5WJF36nDk="
            }})  // This is your file object
          }).catch(function() {
            console.log("error in post data");
            alert("recargue la pagina por favor")
          });
   }

   saveNewJson= async (newObj,key) => {
    let msj=aes256.encrypt(key, JSON.stringify(newObj))
    console.log("msj",msj)

          await fetch('api/file1/F'+sessionStorage.getItem('id'), { // Your POST endpoint
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ "file": {
              "content" : msj,
              "name" : "kYS1cBJ6oqukp0KTeDScD7XHvh5WJF36nDk="
            }})  // This is your file object
          }).catch(function() {
            console.log("error in post data");
            alert("recargue la pagina por favor")
          });
   }

   listChildren = (childrenHere,arr) =>{
    console.log("child", childrenHere)
    //console.log("PRUEBA",childrenHere.children)
    if(childrenHere.children!== "undefined"){
      for(var i=0; i<childrenHere.length;i++){
        console.log("purueba if", childrenHere[i].children === 'undefined')
        if(childrenHere[i].isFolder === true){ //is folder
          console.log("isfolder")
          console.log("PRUEBA",childrenHere[i].children)
          this.listChildren(childrenHere[i].children,arr)
        }else{
          arr.push(childrenHere[i].value)
        }
      }
     }else{
      console.log("here22",childrenHere )
       arr.push(childrenHere.value)
     }
    return arr
   }

   deleteElement = (valueFile,isFolder) => {
     let childrenHere=this.state.here.children;
     let children;
     var arrToDelete = [];
     for(var i=0;i<childrenHere.length;i++){
      if(childrenHere[i].value===valueFile){
        children=i;
      }
    }
     if(isFolder){
      this.setState({listOfChildren:[]})
     
      arrToDelete = this.listChildren(childrenHere[children].children,[])
     
     }else{
      arrToDelete[0]=valueFile;
     }

     var path = "nodes";
     path = this.search(path, this.state.nodes, this.state.here);
     let flagFolderHome = false;
     console.log("path",path)
     path = path.replace("['value']","");
     path = path.replace("nodes,0,","");
     if(path.includes('nodes,0')){
       flagFolderHome=true;
     }
     console.log("path2",path)
     var auxSubPaths= path.split(',')
     console.log("auxSubPaths",auxSubPaths)
     var subPaths = ""
     var x=0;
     for(var i=0; i<auxSubPaths.length;i++){
       if(/^\d+$/.test(auxSubPaths[i+1])){
         if(i===0){
           subPaths=auxSubPaths[i]+"["+auxSubPaths[i+1]+"]"
         }else{
           subPaths=subPaths+"."+auxSubPaths[i]+"["+auxSubPaths[i+1]+"]"
         }      
         i++;
         x++;
       } //if string is num
     }
   
     var data = this.state.nodes[0];
     console.log("subpth", subPaths)
     if(flagFolderHome){
       eval("data.children[children]= {}")
     }else{
       eval("data."+subPaths+".children[children]= {}")
     }
     this.clickInNewFolder()
     this.clickInNewFolder()
   
     setTimeout( 
       function() {
       this.saveJson()
       }
       .bind(this),
       3000
     ); 
     console.log("arrToDelete",arrToDelete)

     fetch('/api/deleteFile/F'+sessionStorage.getItem('id'), { // Your POST endpoint
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(arrToDelete)
      })
      .then((response) => response.json())
      .then((data) => {console.log(data)})
      .catch(function() {
        console.log("error in post data");
      });
  

   } 

paste = async () => {
  console.log("paste")

    var path = "nodes";
    path = this.search(path, this.state.nodes, this.state.here);
    let flagFolderHome = false;
    console.log("path",path)
    path = path.replace("['value']","");
    path = path.replace("nodes,0,","");
    if(path.includes('nodes,0')){
      flagFolderHome=true;
    }
    console.log("path2",path)
    var auxSubPaths= path.split(',')
    console.log("auxSubPaths",auxSubPaths)
    var subPaths = ""
    var x=0;
     for(var i=0; i<auxSubPaths.length;i++){
      if(/^\d+$/.test(auxSubPaths[i+1])){
        if(i===0){
          subPaths=auxSubPaths[i]+"["+auxSubPaths[i+1]+"]"
        }else{
          subPaths=subPaths+"."+auxSubPaths[i]+"["+auxSubPaths[i+1]+"]"
        }      
        i++;
        x++;
      } //if string is num
     }

      //var data = this.state.nodes[0];
      var data = JSON.stringify(this.state.nodes);
      console.log("DATAAA",data)
      console.log("PORTAPEEELLL",this.state.portaPapel)
      if(typeof this.state.portaPapel.label === "undefined"){
        alert("Nada en portapapeles: copie algo antes de pegar")
      }else{
        console.log("subpth", subPaths)
        var data2 = JSON.parse(data);
        console.log("DATA22",data2)
        var here2;
        if(flagFolderHome){
          eval("data2[0].children[data2[0].children.length]= this.state.portaPapel")
          eval ("this.setState({here:data2[0]})")
        }else{
          eval("data2[0]."+subPaths+".children[data2[0]."+subPaths+".children.length]= this.state.portaPapel")
          eval("this.setState({here:data2[0]."+subPaths+"})")
        }
        console.log(data2)
        //await this.setState({here:here2})
        console.log("HEREE 22",this.state.here)
        await this.setState({nodes:data2})
        console.log("NODEESSS UPD", this.state.nodes)
      }
     

}

copyElement = (element) => {
console.log("HOLA VALE",element)
//element.value="copied";
  this.setState({portaPapel:element})
}

editName = (valueFile,newName) => {
  var childrens = this.state.here.children;
  var numChildren=0;
  for(var i=0;i<childrens.length;i++){
    if(childrens[i].value===valueFile){
      numChildren=i;
    }
  }
  console.log("numChildren",numChildren)
  console.log("newname",newName)
  var path = "nodes";
  path = this.search(path, this.state.nodes, this.state.here);
  let flagFolderHome = false;
  console.log("path",path)
  path = path.replace("['value']","");
  path = path.replace("nodes,0,","");
  if(path.includes('nodes,0')){
    flagFolderHome=true;
  }
  console.log("path2",path)
  var auxSubPaths= path.split(',')
  console.log("auxSubPaths",auxSubPaths)
  var subPaths = ""
  var x=0;
  for(var i=0; i<auxSubPaths.length;i++){
    if(/^\d+$/.test(auxSubPaths[i+1])){
      if(i===0){
        subPaths=auxSubPaths[i]+"["+auxSubPaths[i+1]+"]"
      }else{
        subPaths=subPaths+"."+auxSubPaths[i]+"["+auxSubPaths[i+1]+"]"
      }      
      i++;
      x++;
    } //if string is num
  }

  var data = this.state.nodes[0];
  console.log("subpth", subPaths)
  if(flagFolderHome){
    eval("data.children[numChildren].label= newName")
  }else{
    eval("data."+subPaths+".children[numChildren].label= newName")
  }
  this.clickInNewFolder()
  this.clickInNewFolder()

  setTimeout( 
    function() {
    this.saveJson()
    }
    .bind(this),
    3000
  ); 
}

uploadFile = async () => {
  await this.clickInLoad();
  setTimeout( 
      function() {
      var path = "nodes";
      path = this.search(path, this.state.nodes, this.state.here);

      var nameEncrypted =  this.state.nameEncrypted;
      var nameF=  this.state.nameF;
      console.log("NAMEEE",this.state.nameF)
      let newObj = {
        value: nameEncrypted,
        label: nameF,
        isFolder:false
      }
      let flagFolderHome = false;
      console.log("path",path)
      console.log("newobj", newObj)
      path = path.replace("['value']","");
      path = path.replace("nodes,0,","");
      if(path.includes('nodes,0')){
        flagFolderHome=true;
      }
      console.log("path2",path)
      var auxSubPaths= path.split(',')
      console.log("auxSubPaths",auxSubPaths)
      var subPaths = ""
      var x=0;
       for(var i=0; i<auxSubPaths.length;i++){
        if(/^\d+$/.test(auxSubPaths[i+1])){
          if(i===0){
            subPaths=auxSubPaths[i]+"["+auxSubPaths[i+1]+"]"
          }else{
            subPaths=subPaths+"."+auxSubPaths[i]+"["+auxSubPaths[i+1]+"]"
          }      
          i++;
          x++;
        } //if string is num
       }
  
        var data = this.state.nodes[0];
        console.log("subpth", subPaths)
        if(flagFolderHome){
          eval("data.children[data.children.length]= newObj")
        }else{
          eval("data."+subPaths+".children[data."+subPaths+".children.length]= newObj")
        }
        this.clickInNewFolder()
        this.clickInNewFolder()
        //this.setState({nodes:data})
        setTimeout( 
          function() {
          this.saveJson()
          }
          .bind(this),
          3000
        ); 
    }
    .bind(this),
    5000
); 
}

callJSON = async (key) => {

  const response = await fetch('/api/getFile/kYS1cBJ6oqukp0KTeDScD7XHvh5WJF36nDk=/F'+sessionStorage.getItem('id'));
  const body = await response.blob();
  if (response.status !== 200){
    console.log("ERRORRR")
    alert("Por favor intente de nuevo")
  }
  let fileReader = new FileReader();
  let content;
  fileReader.onloadend =  async function  (e){

    content = aes256.decrypt(key,fileReader.result);

    var flagJson = false;
    try {
      console.log(JSON.parse(content)) 
    } catch(e) {
      flagJson = true;
      console.log("clave errada")
      alert("clave errada");
       // error in the above string (in this case, yes)!
    }
    if(!flagJson){
      console.log("contentdes", JSON.parse(content));
      console.log("nodes",this.state.nodes)
      var fileDown =[];
  
      this.setState({nodes:JSON.parse(content)})
      console.log("nodes",this.state.nodes)
      fileDown[0]=content;
      this.setState({here:this.state.nodes[0]});
      this.clickInNewFolder()
      this.clickInNewFolder()
      this.clickInKey();
     // download(content,filename,"js");
    }

      
  }.bind(this)
  fileReader.readAsText(body);

}  
render() {
  const childrenFolder = [];
  const childrenFile = [];
  var flagEmpty = false;

  console.log("here",this.state.here)
    let auxChildren=this.state.here.children;
    for (var i = 0; i < auxChildren.length; i += 1) {
      if(typeof auxChildren[i].label === "undefined"){
        console.log("boorrado")
      }else
      if(typeof auxChildren[i].children !== "undefined") {  // ES PADRE (Carpeta)

        childrenFolder.push(<Col key={i} className="nodeCard " sm="8" md="3"><Folder  number={i}  
          children={auxChildren[i]}labelFile={auxChildren[i].label} 
          valueFile={auxChildren[i].value} changeHere={this.changeHere}
          deleteElement={this.deleteElement} copyElement={this.copyElement}
          editName={this.editName} /></Col>);
        
        flagEmpty = true;
      }else{//Es un file

        childrenFile.push(<Col key={i} className="nodeCard " sm="8" md="3"><File  number={i}
        children={auxChildren[i]} labelFile={auxChildren[i].label} valueFile={auxChildren[i].value}
         deleteElement={this.deleteElement} copyElement={this.copyElement}
         editName={this.editName} callFile = {this.callFile} /></Col>);
        flagEmpty = true;
      }
        
    };
    if(!flagEmpty){
      childrenFolder.push(<h2 key="empty">
        Folder Empty
      </h2>)
    }
    childrenFolder.push(childrenFile);

    return (
      <div className="App"> 

        <Navbar/>
        
        <Row>
    <Col sm={2}>
        <div className="md-form mb-3">
        <div className="md-form my-0">
        <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"></input>
      </div>      
        </div>

        <div className="md-form mb-3">
        
        <i className="far fa-clock"> <strong>Recent</strong></i>
        
        </div>

        <div className="md-form mb-3">
        <i className="fas fa-star"> Outstanding</i>
        </div>
        
        <div className="md-form mb-3">
        <i className="fas fa-trash-alt"> Trash</i>
        </div>
        <hr className="my-5"></hr>
        <div className="md-form mb-3 ">
        <i className="fas fa-server">  Storage</i>
        <MDBProgress value={25} className="my-2" />
        398.8 Mb of 5G used<br></br>
       <a className="color"> Increase storage</a>
        </div>
        </Col>
    <Col sm={8}>     
     <Row> 
     <Button color="light-blue" className="boton2" onClick={this.clickInNewFolder}><i className="fas fa-folder-plus"></i> Create Folder</Button>
          <Button color="light-blue" className="boton" onClick={this.paste}><i className="fas fa-save"></i> Paste</Button>
          <Button color="light-blue" className="boton" onClick={this.uploadFile}><i className="fas fa-file-upload"></i> File upload</Button>
          <Button color="light-blue" className="boton" onClick={this.clickInBefore}><i className="fas fa-undo-alt"></i> Back</Button>
         
          {/* <Col xs="4">
            <CheckboxTree
              nodes={this.state.nodes}
              checked={this.state.checked}
              expanded={this.state.expanded}
              onCheck={checked => this.setState({ checked })}
              onExpand={expanded => this.setState({ expanded })}
              onClick={clicked => this.selected(clicked)}
            />
          </Col> */}
          <Col xs="12">
            <Row>
          
            {childrenFolder}
            </Row>
          </Col>
        </Row>
        </Col>
  </Row>
      <Container>

      
        <Modal isOpen={this.state.modalNewFolder} toggle={this.clickInNewFolder}>
          <ModalHeader toggle={this.clickInNewFolder}>Create Folder</ModalHeader>
          <ModalBody>
          <FormGroup>
            <Label for="newFolder">Name of folder:</Label>
            <Input type="text" name="newFolder" id="newFolder" placeholder="New name"/>
          </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button className="boton" color="primary"  onClick={this.createFolder}>Create</Button>{' '}
            <Button className="boton" color="secondary" onClick={this.clickInNewFolder}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalKey} toggle={this.clickInkey}>
          <ModalHeader toggle={this.clickInkey}>KEY</ModalHeader>
          <ModalBody>
          <FormGroup>
            <Label for="key">Enter your password:</Label>
            <Input type="password" name="key" id="key" placeholder="KEY SECRET"/>
          </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button className="boton" color="primary" onClick={this.asingKey}>OK</Button>{' '}
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalNewKey} toggle={this.clickInNewkey}>
          <ModalHeader toggle={this.clickInNewkey}>NEW KEY</ModalHeader>
          <ModalBody>
          <FormGroup>
            <Label for="newKey">Enter your secret key (it is recommended to investigate as it should be a secure key) you must remember this key, if you lose it we will not be able to do anything:</Label>
            <Input type="password" name="newkey" id="newKey" placeholder="KEY SECRET"/>
            <br></br>
            <Label for="repeatkey">Repeat your secret key:</Label>
            <Input type="password" name="repeatkey" id="repeatkey" placeholder="REPEAT KEY SECRET"/>
          </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button className="boton" color="primary" onClick={this.newKey}>OK</Button>{' '}
          </ModalFooter>
        </Modal>
        
        {/* file */}

       
        {/* <Button className="boton" onClick={this.clickInLoad} color="primary">primary</Button>{' '} */}
        <input hidden type="file" id="inputUpload" name="files[]" multiple/> 

        {/* <Button onClick={this.callFile} color="primary">call file</Button>{' '} */}
        

      </Container>
      </div>
    );
  }
}

export default App;
