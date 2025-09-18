let usuarios = []
let turnos = []

function initSeed(){
  let u = JSON.parse(localStorage.getItem('usuarios')||'null')
  if(!u){
    usuarios = [{usuario:'Sergio',clave:'peluqueria',role:'admin'}]
    localStorage.setItem('usuarios',JSON.stringify(usuarios))
  }
  let t = JSON.parse(localStorage.getItem('turnos')||'null')
  if(!t){
    turnos = []
    localStorage.setItem('turnos',JSON.stringify(turnos))
  }
}

function currentUser(){return localStorage.getItem('sesion')||null}

document.addEventListener('DOMContentLoaded',()=>{
  initSeed()
  const formLogin = document.getElementById('formLogin')
  const formRegister = document.getElementById('formRegister')
  const formReserva = document.getElementById('formReserva')
  const btnLogout = document.getElementById('btnLogout')
  const btnCheck = document.getElementById('btnCheck')
  const panelAdmin = document.getElementById('panelAdmin')
  const misTurnos = document.getElementById('misTurnos')
  const todosTurnos = document.getElementById('todosTurnos')
  const btnExport = document.getElementById('btnExport')
  const btnClear = document.getElementById('btnClear')

  if(formLogin){
    formLogin.addEventListener('submit',e=>{
      e.preventDefault()
      const u = document.getElementById('usuario').value.trim()
      const c = document.getElementById('clave').value.trim()
      usuarios = JSON.parse(localStorage.getItem('usuarios')||'[]')
      const encontrada = usuarios.find(x=>x.usuario===u && x.clave===c)
      if(encontrada){
        localStorage.setItem('sesion',u)
        window.location='agenda.html'
      } else alert('Usuario o contraseña incorrectos')
    })
  }

  if(formRegister){
    formRegister.addEventListener('submit',e=>{
      e.preventDefault()
      const u = document.getElementById('nuevoUsuario').value.trim()
      const c = document.getElementById('nuevaClave').value.trim()
      usuarios = JSON.parse(localStorage.getItem('usuarios')||'[]')
      if(usuarios.find(x=>x.usuario===u)){alert('El usuario ya existe');return}
      usuarios.push({usuario:u,clave:c,role:'user'})
      localStorage.setItem('usuarios',JSON.stringify(usuarios))
      alert('Cuenta creada, ya podés iniciar sesión')
      window.location='login.html'
    })
  }

  if(btnLogout) btnLogout.addEventListener('click',()=>{localStorage.removeItem('sesion');window.location='index.html'})

  if(formReserva){
    usuarios = JSON.parse(localStorage.getItem('usuarios')||'[]')
    const ses = currentUser()
    if(ses){
      document.getElementById('fechaReserva').value = new Date().toISOString().slice(0,10)
    }
    loadTurnos()
    renderUserTurnos()
    formReserva.addEventListener('submit',e=>{
      e.preventDefault()
      const fecha = document.getElementById('fechaReserva').value
      const hora = document.getElementById('horaReserva').value
      const servicio = document.getElementById('servicio').value
      if(!fecha||!hora){alert('Completá fecha y hora');return}
      loadTurnos()
      if(turnos.find(t=>t.fecha===fecha && t.hora===hora)){alert('Horario no disponible');return}
      const usuarioReserva = currentUser()
      if(!usuarioReserva){alert('Tenés que iniciar sesión');return}
      turnos.push({cliente:usuarioReserva,fecha,hora,servicio,created:new Date().toISOString()})
      localStorage.setItem('turnos',JSON.stringify(turnos))
      renderUserTurnos()
      renderAllTurnos()
      document.getElementById('msg').textContent = 'Turno reservado'
    })
    btnCheck && btnCheck.addEventListener('click',()=>{loadTurnos();alert(turnos.map(t=>t.fecha+' '+t.hora+' - '+t.cliente).join('\n')||'No hay turnos')})
  }

  function loadTurnos(){turnos = JSON.parse(localStorage.getItem('turnos')||'[]')}
  function renderUserTurnos(){
    loadTurnos()
    const ses = currentUser()
    const ul = document.getElementById('misTurnos')
    if(!ul) return
    ul.innerHTML = ''
    const mine = turnos.filter(t=>t.cliente===ses)
    if(mine.length===0) ul.innerHTML = '<li>No hay reservas</li>'
    mine.forEach((t,i)=>{
      const li = document.createElement('li')
      li.textContent = t.fecha+' '+t.hora+' • '+t.servicio
      const btn = document.createElement('button')
      btn.className = 'small-btn'
      btn.textContent = 'Cancelar'
      btn.onclick = ()=>{turnos.splice(turnos.indexOf(t),1);localStorage.setItem('turnos',JSON.stringify(turnos));renderUserTurnos();renderAllTurnos()}
      li.appendChild(btn)
      ul.appendChild(li)
    })
  }

  function renderAllTurnos(){
    loadTurnos()
    const ul = document.getElementById('todosTurnos')
    if(!ul) return
    ul.innerHTML = ''
    if(turnos.length===0) ul.innerHTML = '<li>No hay turnos</li>'
    turnos.forEach((t,i)=>{
      const li = document.createElement('li')
      li.innerHTML = '<div>'+t.fecha+' '+t.hora+' • '+t.servicio+' <span class="muted">('+t.cliente+')</span></div>'
      const del = document.createElement('button')
      del.className = 'small-btn'
      del.textContent = 'Eliminar'
      del.onclick = ()=>{turnos.splice(i,1);localStorage.setItem('turnos',JSON.stringify(turnos));renderAllTurnos();renderUserTurnos()}
      li.appendChild(del)
      ul.appendChild(li)
    })
  }

  if(panelAdmin){
    loadTurnos()
    const ses = currentUser()
    const usuarios = JSON.parse(localStorage.getItem('usuarios')||'[]')
    const me = usuarios.find(x=>x.usuario===ses)
    if(me && me.role==='admin') panelAdmin.style.display = 'block'
    renderAllTurnos()
    btnExport && btnExport.addEventListener('click',()=>{loadTurnos();const a=document.createElement('a');a.href='data:application/json;charset=utf-8,'+encodeURIComponent(JSON.stringify(turnos));a.download='turnos.json';a.click()})
    btnClear && btnClear.addEventListener('click',()=>{if(confirm('Borrar todos los turnos?')){turnos=[];localStorage.setItem('turnos',JSON.stringify(turnos));renderAllTurnos();renderUserTurnos()}})
  }
})