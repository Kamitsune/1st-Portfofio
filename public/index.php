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

$app->run();
