<?php

namespace App\Controller;

use Exception;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class HomeController
{
    #[Route('/', name: 'home', methods: ['GET', 'HEAD'])]
    public function number(): JsonResponse
    {
        try {
            $number = random_int(0, 1000);
        } catch (Exception $e) {
            $number = -7;
        }

        return new JsonResponse(['number' => $number]);
    }
}
