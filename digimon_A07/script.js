let currentPage = 1; 
const itemsPerPage = 10;
let digimonData = [];

$(document).ready(function() {
    fetchDigimon();

    function fetchDigimon() {
        $.get('https://digimon-api.vercel.app/api/digimon', function(data) {
            digimonData = data; 
            
            const urlParams = new URLSearchParams(window.location.search);
            const pageParam = parseInt(urlParams.get('page'));
            if (!isNaN(pageParam) && pageParam > 0) {
                currentPage = pageParam; 
            }
            renderGallery();
        });
    }

    function renderGallery() {
        const gallery = $("#gallery");
        gallery.empty();
        
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedData = digimonData.slice(startIndex, endIndex);

        paginatedData.forEach(digimon => {
            const digimonCard = `
                <div class="col-md-4">
                    <div class="card">
                        <img src="${digimon.img}" class="card-img-top" alt="${digimon.name}">
                        <div class="card-body">
                            <h5 class="card-title">${digimon.name}</h5>
                            <p class="card-text">Level: ${digimon.level}</p>
                            <a href="view.html?name=${encodeURIComponent(digimon.name)}" class="btn btn-primary">View More</a>
                        </div>
                    </div>
                </div>
            `;
            gallery.append(digimonCard);
        });

       
        $("#prev-btn").prop('disabled', currentPage === 1);
        $("#next-btn").prop('disabled', endIndex >= digimonData.length);
        $("#page-number").text(`Page ${currentPage}`);
    }

    $("#prev-btn").click(function() {
        if (currentPage > 1) {
            currentPage--;
            renderGallery();
        }
    });

    $("#next-btn").click(function() {
        if (currentPage * itemsPerPage < digimonData.length) {
            currentPage++;
            renderGallery();
        }
    });

    $("#latest-btn").click(function() {
        currentPage = Math.ceil(digimonData.length / itemsPerPage); 
        renderGallery();
    });
});
