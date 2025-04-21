$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

  // Menampilkan daftar dokter
fetch('http://localhost:5000/api/dokter')
.then(res => res.json())
.then(data => {
  data.forEach(dokter => {
    // tampilkan ke HTML
    console.log(dokter.nama);
  });
});

// Menambahkan dokter baru (form submission)
function tambahDokter(nama, spesialis, jadwal) {
fetch('http://localhost:5000/api/dokter', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nama, spesialis, jadwal })
})
  .then(res => res.json())
  .then(data => alert(data.message));
}
