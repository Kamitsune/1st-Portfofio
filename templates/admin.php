<html lang="fr">
<head>
<meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="La liste de tous les messages reçus">
  <title>Liste des messages</title>
  <link rel="stylesheet" type="text/css" href="/app.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">
  <meta name="robots" content="index, follow">
  <meta name="google" content="notranslate">
  <meta name="author" content="Kamitsune">
</head>
<body>
  <h1>Liste des messages</h1>
  <table>
    <thead>
      <th>Nom</th>
      <th>Prénom</th>
      <th>Email</th>
      <th>Message</th>
    </thead>
    <tbody>
      <?php foreach($data as $d): ?>
        <tr>
          <td><?= $d['lastname']; ?></td>
          <td><?= $d['firstname']; ?></td>
          <td><?= $d['email']; ?></td>
          <td><?= $d['message']; ?></td>
        </tr>
      <?php endforeach; ?>
    </tbody>
  </table>

</body>
</html>