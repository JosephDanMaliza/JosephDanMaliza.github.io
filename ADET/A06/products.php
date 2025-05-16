<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include("connect.php");

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
  case 'POST':
    handlePost($pdo, $input);
    break;
  case 'GET':
    handleGet($pdo, $_GET);
    break;
  default:
    echo json_encode(['message' => 'Invalid request method']);
    break;
}
function handlePost($pdo, $input)
{
    if (isset($input['categoryID'])) {
        $sql = "SELECT * FROM products WHERE categoryID = :categoryID";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['categoryID' => $input['categoryID']]);
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($products as &$product) {
            $sqlSizes = "SELECT sizeCode, price FROM product_sizes WHERE productID = :productID";
            $stmtSizes = $pdo->prepare($sqlSizes);
            $stmtSizes->execute(['productID' => $product['productID']]);
            $sizes = $stmtSizes->fetchAll(PDO::FETCH_ASSOC);

            $product['sizes'] = $sizes;
        }

        echo json_encode($products);
    } else {
        echo json_encode(['message' => 'categoryID is required']);
    }
}

function handleGet($pdo, $queryParams)
{
    if (isset($queryParams['categoryID'])) {
        $sql = "SELECT * FROM products WHERE categoryID = :categoryID";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['categoryID' => $queryParams['categoryID']]);
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($products as &$product) {
            $sqlSizes = "SELECT sizeCode, price FROM product_sizes WHERE productID = :productID";
            $stmtSizes = $pdo->prepare($sqlSizes);
            $stmtSizes->execute(['productID' => $product['productID']]);
            $sizes = $stmtSizes->fetchAll(PDO::FETCH_ASSOC);

            $product['sizes'] = $sizes;
        }

        echo json_encode($products);
    } else {
        echo json_encode(['message' => 'categoryID is required']);
    }
}

?>