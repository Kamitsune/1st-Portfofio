<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Slim\Views\PhpRenderer;
use Portfolio\Dbconnection;

require_once './src/libs/Dbconnection.php';

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();

$app->get('/app.css', function (Request $request, Response $response, $args){
  $response = $response->withHeader('Content-Type', 'text/css; charset=UTF-8');
  $response->getBody()->write(file_get_contents(__DIR__ . '/assets/css/style.min.css'));
  return $response;
});

$app->get('/app.js', function (Request $request, Response $response, $args) {
  $response = $response->withHeader('Content-Type', 'text/javascript; charset=UTF-8');
  $response->getBody()->write(file_get_contents(__DIR__ . '/assets/js/app.js'));
  return $response;
});

$app->get('/assets/img/{filename}', function (Request $request, Response $response, $args) {
  $filePath = __DIR__ . '/assets/img/' . $args['filename'];
  $fileStream = fopen($filePath, 'r');
  $response = $response->withHeader('Content-Type', mime_content_type($filePath));
  return $response->withBody(new \Slim\Psr7\Stream($fileStream));
});

$app->get('/', function (Request $request, Response $response, $args) {
  $render = new PhpRenderer(__DIR__ . '/../templates/');
  return $render->render($response, 'index.php', $args);
});

$app->post('/', function(Request $request, Response $response, $args){
  $pdo = Dbconnection::getConnection();
  $req = $pdo->prepare('INSERT INTO message (lastname, firstname, email, message) VALUES (:lastname, :firstname, :email, :message)');
  $data = $request->getParsedBody();
  $errors = [];

  // Validation du champ lastname
  if (!isset($data['lastname']) || strlen($data['lastname']) < 1 || strlen($data['lastname']) > 50 || empty(trim($data['lastname']))) {
      $errors[] = 'Le champ nom doit contenir entre 1 et 50 caractères.';
  }
  // Validation du champ firstname
  if (!isset($data['firstname']) || strlen($data['firstname']) < 1 || strlen($data['firstname']) > 50 || empty(trim($data['firstname']))) {
      $errors[] = 'Le champ prénom doit contenir entre 1 et 50 caractères.';
  }
  // Validation du champ email
  if (!isset($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL) || strlen($data['email']) > 75) {
      $errors[] = 'Le champ email doit contenir un email valide et ne doit pas dépasser 75 caractères.';
  }
  // Validation du champ message
  if (!isset($data['message']) || empty(trim($data['message']))) {
      $errors[] = 'Le champ message ne doit pas être vide.';
  }
  // Si des erreurs ont été trouvées, retourner une réponse avec les erreurs
  if (!empty($errors)) {
      $response = $response->withStatus(400);
      $response->getBody()->write(json_encode(['errors' => $errors]));
      return $response;
  }

  $lastname = htmlspecialchars($data['lastname'], ENT_QUOTES, 'UTF-8');
  $firstname = htmlspecialchars($data['firstname'], ENT_QUOTES, 'UTF-8');
  $email = htmlspecialchars($data['email'], ENT_QUOTES, 'UTF-8');
  $message = htmlspecialchars($data['message'], ENT_QUOTES, 'UTF-8');
  $req->bindParam(':lastname', $lastname);
  $req->bindParam(':firstname', $firstname);
  $req->bindParam(':email', $email);
  $req->bindParam(':message', $message);
  $req->execute();
  return $response;
});

$app->get('/list-message', function(Request $request, Response $response, $args){
  $pdo = Dbconnection::getConnection();

  $req = $pdo->prepare('SELECT * FROM message');

  $req->execute();

  $data = $req->fetchAll(PDO::FETCH_ASSOC);

  $render = new PhpRenderer(__DIR__ . '/../templates/');

  return $render->render($response, 'admin.php', $data);
});

$app->run();
