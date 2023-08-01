// Yeni bir kayıt eklemek için
function addData() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;

  // validasyon
  if (name === "" || !isNaN(name) || age === "") {
    alert("Name and Age fields are required.");
    return;
  }

  // Eğer kayıt varsa güncelleme yapma
  if (checkDuplicate(name)) {
    alert("A record with the same name already exists.");
    return;
  }

  const newRecord = {
    name: name,
    age: age
  };

  // Local Storage'daki mevcut kayıtları al
  const records = getRecordsFromLocalStorage();

  // Yeni kaydı ekleyip güncellenmiş listeyi tekrar Local Storage'a yaz
  records.push(newRecord);
  localStorage.setItem("records", JSON.stringify(records));

  showRecords();
}

// Bir kaydı güncellemek için
function updateData() {
  const nameToUpdate = document.getElementById("name").value;
  const ageToUpdate = document.getElementById("age").value;

  if (nameToUpdate === "" || ageToUpdate === "") {
    alert("Name and Age fields are required.");
    return;
  }

  const records = getRecordsFromLocalStorage();

  // Güncellenecek kaydın mevcut olup olmadığını kontrol et
  const index = records.findIndex(record => record.name === nameToUpdate);

  if (index === -1) {
    alert("Record not found.");
    return;
  }

  records[index].age = ageToUpdate;
  localStorage.setItem("records", JSON.stringify(records));

  showRecords();
}

// Bir kaydı silmek için
function deleteData() {
  const nameToDelete = document.getElementById("name").value;

  if (nameToDelete === "") {
    alert("Name field is required.");
    return;
  }

  const records = getRecordsFromLocalStorage();

  // Silinecek kaydın mevcut olup olmadığını kontrol et
  const index = records.findIndex(record => record.name === nameToDelete);

  if (index === -1) {
    alert("Record not found.");
    return;
  }

  records.splice(index, 1);
  localStorage.setItem("records", JSON.stringify(records));

  showRecords();
}

// Local Storage'daki kayıtları getirir
function getRecordsFromLocalStorage() {
  const recordsJson = localStorage.getItem("records");
  return recordsJson ? JSON.parse(recordsJson) : [];
}

// Verilen isimde kayıt olup olmadığını kontrol eder
function checkDuplicate(name) {
  const records = getRecordsFromLocalStorage();
  return records.some(record => record.name === name);
}

// Kayıtları gösterir
function showRecords() {
  const records = getRecordsFromLocalStorage();
  const outputDiv = document.getElementById("output");

  // Önceki içeriği temizle
  outputDiv.innerHTML = "";

  // Her bir kaydı listeye ekle
  records.forEach((record, index) => {
    const recordDiv = document.createElement("div");
    recordDiv.textContent = `${index + 1}. ${record.name} ${record.age}`;
    outputDiv.appendChild(recordDiv);
  });
}

// Sayfa yüklendiğinde kayıtları göster
showRecords();