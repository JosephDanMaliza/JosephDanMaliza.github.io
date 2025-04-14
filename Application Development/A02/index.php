<?php
$page = "home";

if (isset($_GET['page'])) {
  $validPages = ['home', 'toys', 'foods', 'pets'];
  $page = in_array($_GET['page'], $validPages) ? $_GET['page'] : 'home';
}
?>

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Woof and Meow Emporium</title>
  <link rel="icon" href="res/pet_icon.ico">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Baloo+2&family=Fredoka&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="res/styles.css">
  <link rel="icon" href="res/imgs/rowlett.png">

</head>

<body data-bs-theme="light" style="background-image: url('res/pawBackground.png'); background-size: cover; background-repeat: no-repeat; background-attachment: fixed; background-position: center;">

  <nav class="navbar navbar-light shadow">
    <div class="container-fluid">
      <a class="navbar-brand site-logo">
        <span style="color: #1a3d6d;"><strong>Woof&amp;Meow</strong></span>
        <span style="color: rgb(31, 27, 27);"><strong>Emporium</strong></span>
      </a>
    </div>
  </nav>

  <div class="container-fluid mt-3">
    <div class="row">
      
      <!-- Sidebar -->
      <div class="col-12 col-md-4 col-lg-3 mb-3">
        <div class="sidebar shadow">
          <h4 class="paw-heading">
            <span class="paw-text">Pet Paw-radise</span>
          </h4>
          <a href="?page=home" class="btn btn-pet d-flex align-items-center gap-2 my-2">
            <i class="fa-solid fa-house icon-toys"></i><span class="text-toys">Home</span>
          </a>
          <a href="?page=toys" class="btn btn-pet d-flex align-items-center gap-2 my-2">
            <i class="fa-solid fa-bone icon-toys"></i><span class="text-toys">Toys</span>
          </a>
          <a href="?page=foods" class="btn btn-pet d-flex align-items-center gap-2 my-2">
            <i class="fa-solid fa-bowl-food icon-foods"></i><span class="text-foods">Foods</span>
          </a>
          <a href="?page=pets" class="btn btn-pet d-flex align-items-center gap-2 my-2">
            <i class="fa-solid fa-paw icon-pets"></i><span class="text-pets">Pets</span>
          </a>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="col-12 col-md-8 col-lg-9">
        <div class="scroll-box">
          <div class="card shadow p-3 main-container" style="min-height: 60vh;">
            <?php if ($page === "home"): ?>
              <div class="text-center mt-5 mb-4">
                <h2 class="fw-bold text-primary home-title" style="font-size: 2.5rem; font-weight: bold;">
                  Welcome to <span style="color: #1a3d6d;">Woof & Meow</span> Emporium 
                </h2>
                <p class="lead text-dark fw-bold home-text" style="font-size: 1.75rem; font-weight: bold;">
                  A warm and welcoming haven for every breed of dog and cat — where your beloved pets are treated like royalty. 
                  Discover a world of comfort, joy, and tail-wagging happiness. Start exploring our pawsome categories today!
                </p>
                <i class="fa-solid fa-paw mt-4" style="color: #1a3d6d; font-size: 10rem;"></i>
              </div>
            <?php else: ?>
              <?php include("shared/{$page}.php"); ?>
            <?php endif; ?>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- Bootstrap JS -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
