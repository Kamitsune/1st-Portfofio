!<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Mon portfolio v4">
  <title>Alan Guyenne</title>
  <link rel="stylesheet" type="text/css" href="/app.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">
  <meta name="robots" content="index, follow">
  <meta name="google" content="notranslate">
  <meta name="author" content="Alan Guyenne">
</head>

<body>
    <div class="overlay"></div>

    <div class="portfolio">
        <span class="not">C</span>
        <span class="not">H</span>
        <span class="not">A</span>
        <span class="not">R</span>
        <span class="not">G</span>
        <span class="not">E</span>
        <span class="not">M</span>
        <span class="not">E</span>
        <span class="not">N</span>
        <span class="not">T</span>
    </div>
    <div class="myName">
        <p class="animeName">ALAN</p>
        <p class="animeName">GUYENNE</p>
    </div>

    <div class="bio">
        <h2 class="catchphrase">Mon objectif : écrire le code de demain</h2>
        <p class="bioText">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, cupiditate consectetur! Accusantium sed voluptatibus officiis enim libero vero dolores iusto aliquam iste tempore cumque qui sint magni, minus consectetur fugit! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel delectus optio a neque consequatur porro, reprehenderit possimus. Tempore magnam at, ea facere consequatur obcaecati? Nulla cupiditate perspiciatis dolore iure quaerat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora illum, quo nihil, ducimus fugit reprehenderit, repellat pariatur accusantium magnam optio culpa quaerat! Assumenda, architecto ullam adipisci suscipit quae mollitia sint.</p>
    </div>

    <span class="projects">Projets</span>

    <div class="project one">
        <img src="../assets/img/kitagawa.jpg" alt="Aperçu du premier projet">
    </div>
    
    <div class="project-alt two">
        <img src="../assets/img/vei.jpg" alt="Aperçu du deuxième projet">
    </div>
    
    <div class="project three">
        <img src="../assets/img/kitagawa_noel.jpg" alt="Aperçu du troisième projet">
    </div>
    
    <div class="project-alt four">
        <img src="../assets/img/ganyu.jpg" alt="Aperçu du quatrième projet">
    </div>
    
    <div class="project five">
        <img src="../assets/img/kitagawa_halloween.png" alt="Aperçu du cinquième projet">
    </div>

    <div class="project-alt six">
        <img src="../assets/img/mekakucity_actors.jpg" alt="Aperçu du sixième projet">
    </div>

    <span class="contact">Contact</span>

    <div class="card-container">
        <div id="card">
            <div class="face front">
                <form action="" method="post" autocomplete="off" id="form-message">
                    <label for="input1" id="label1">Nom</label>
                    <span id="underline1"></span>
                    <input type="text" name="lastname" id="input1" required>

                    <label for="input2" id="label2">Prénom</label>
                    <span id="underline2"></span>
                    <input type="text" name="firstname" id="input2" required>
                    
                    <label for="input3" id="label3">Email</label>
                    <span id="underline3"></span>
                    <input type="email" name="email" id="input3" required>
                    
                    <label for="input4" id="label4">Message</label>
                    <span id="underline4"></span>
                    <textarea id="input4" name="message" rows="5" required></textarea>
                    
                    <div class="submit">
                        <button id="btnForm">Envoyer</button>
                    </div>
                </form>
            </div>

            <div class="face middle">
                <img src="../assets/img/form-background.webp" alt="background of social media" id="social-bg">
            </div>
            
            <div class="face back">
                <span class="info">alan.guyenne1@gmail.com</span>
                <span class="info">+33 6 26 26 33 85</span>
                <i class="fa-brands fa-github"></i>
                <i class="fa-brands fa-linkedin"></i>
            </div>
        </div>
        <div id="svg-container" class="hide">
            <svg id="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
        </div>
    </div>
    
    <script src="/app.js"></script>
</body>
</html>