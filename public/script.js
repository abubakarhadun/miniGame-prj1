const SceneDaftar  = document.getElementById('daftarPage'); 


const buttonLogin = document.getElementById('form-login');
buttonLogin.addEventListener('submit', function(e){
e.preventDefault();
    const username = document.getElementById('inputanUsername').value;
    const password = document.getElementById('inputanPassword').value;

    fetch('/users/login', {
        method: 'POST',
        headers:{'Content-Type' : 'application/json'},
        body:JSON.stringify({username, password})
    })
    .then(res=> res.json())
    .then(data => {
        if(data.user){
            const namaPengguna = document.getElementById('namaPengguna');
            namaPengguna.textContent = `Selamat Datang: ${data.user.name}`;
            document.getElementById('halamanAwal').style.padding = '2%';
            document.getElementById('halamanAwal').style.height = '40%';
            document.getElementById('halamanAwal').style.width = '40%';
            document.getElementById('setelahLogin').style.display = 'flex';
            buttonLogin.reset();
        }else{
            alert('Username Dan Password Salah');
        }
    }).catch(err => {
        alert(err.message);
        alert('Terjadi kesalahan saat Login');
    });
});


document.getElementById('buttonDaftar').addEventListener('click', function(e){
    e.preventDefault();
    SceneDaftar.style.display = "flex";
    document.getElementById('halamanAwal').style.display = 'none';
    
});

document.getElementById('buttonKembaliDaftar').addEventListener('click', function(e){
    SceneDaftar.style.display = "none";
    document.getElementById("halamanAwal").style.display = "flex";    

});

document.getElementById('form-daftar').addEventListener('submit', function(e){
    e.preventDefault();
    const daftarUsername = document.getElementById('inputanUsernameBaru').value;
    const daftarPassword = document.getElementById('inputanPasswordBaru').value;

    fetch('/users/daftar',{
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body:JSON.stringify({daftarUsername, daftarPassword})
        })
        .then(res => {
            if(!res.ok){
                return res.json().then(err  =>{
                    alert('gagal menyimpan : ' + err.message);
                    throw new Error(err.error);
                });
            }
            return res.json();
    
    
        }).then(user =>{
            alert(`username dengan nama : ${user.name} - dan password : ${user.password} berhasil disimpan.`);
            document.getElementById('form-daftar').reset();
        }).catch(err =>{
            alert('Fetch error:', err.message);
        }); 
});


document.addEventListener('mousemove', function (e) {
    const canon = document.getElementById('canon');
    const rect = canon.getBoundingClientRect();


    const centerX = (rect.left + rect.width) / 2;
    const centerY = (rect.top + rect.height) / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;


    const angle = Math.atan2(dy, dx);
    const degree = angle * (180/Math.PI);

    canon.style.transform = `rotate(${degree}deg)`;
});
