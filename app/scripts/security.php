<?php

declare(strict_types=1);

const DEFAULT_ALLOWED_ORIGINS = 'https://axelnell-wedding.fr,http://localhost:3000,http://127.0.0.1:3000';

function configureSecurityHeaders(): void
{
    header('Content-Type: application/json; charset=utf-8');
    header('X-Content-Type-Options: nosniff');
    header('Referrer-Policy: no-referrer');
    header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
    header('Pragma: no-cache');

    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $allowedOrigins = array_filter(array_map(
        static fn (string $origin): string => trim($origin),
        explode(',', getenv('WEDDING_ALLOWED_ORIGINS') ?: DEFAULT_ALLOWED_ORIGINS)
    ));

    if ($origin !== '' && in_array($origin, $allowedOrigins, true)) {
        header("Access-Control-Allow-Origin: {$origin}");
        header('Access-Control-Allow-Credentials: true');
        header('Vary: Origin');
    }

    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, X-CSRF-Token');
}

function handlePreflightRequest(): void
{
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

function startSecureSession(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }

    $isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');

    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'domain' => '',
        'secure' => $isHttps,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);

    session_start();
}

function jsonResponse(array $payload, int $statusCode = 200): void
{
    http_response_code($statusCode);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

function requirePostRequest(): void
{
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        jsonResponse(['success' => false, 'errors' => ['Méthode non autorisée']], 405);
    }
}

function normalizeStringInput(string $key): string
{
    return trim((string) ($_POST[$key] ?? ''));
}

function createCsrfToken(): string
{
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));

    return $_SESSION['csrf_token'];
}

function requireAuthenticatedUser(): string
{
    $login = $_SESSION['user_login'] ?? '';

    if (!is_string($login) || $login === '') {
        jsonResponse(['success' => false, 'errors' => ['Session expirée, merci de vous reconnecter']], 401);
    }

    return $login;
}

function requireValidCsrfToken(): void
{
    $sessionToken = $_SESSION['csrf_token'] ?? '';
    $requestToken = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? ($_POST['csrfToken'] ?? '');

    if (!is_string($sessionToken) || !is_string($requestToken) || $sessionToken === '' || !hash_equals($sessionToken, $requestToken)) {
        jsonResponse(['success' => false, 'errors' => ['Jeton de sécurité invalide']], 403);
    }
}
