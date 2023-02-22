<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Persistence\ObjectManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\ConstraintViolationListInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class UserController extends AbstractController
{
    private ObjectManager $entityManager;
    private ValidatorInterface $validator;
    private UserRepository $repository;

    public function __construct(
        ManagerRegistry $doctrine,
        ValidatorInterface $validator,
        UserRepository $repository
    ) {
        $this->entityManager = $doctrine->getManager();
        $this->validator = $validator;
        $this->repository = $repository;
    }

    #[Route('/user', name: 'user.index', methods: ['GET', 'HEAD'])]
    public function index(): JsonResponse
    {
        // @todo: Add pagination
        $users = $this->repository->findAll();

        return $this->json($users);
    }

    #[Route('/user', name: 'user.store', methods: ['POST'])]
    public function store(Request $request): JsonResponse
    {
        $user = new User();
        $this->setRequestData($user, $request);
        $violations = $this->validator->validate($user);

        if (count($violations)) {
            return $this->errorResponse(violations: $violations);
        }

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $this->json(['user' => $user]);
    }

    #[Route('/user/{id}', name: 'user.update', methods: ['PUT'])]
    public function update(int $id, Request $request): JsonResponse
    {
        $user = $this->repository->find($id);

        if (!$user) {
            return $this->errorResponse(error: 'User not found.', code: Response::HTTP_NOT_FOUND);
        }

        $this->setRequestData($user, $request);
        $violations = $this->validator->validate($user);

        if (count($violations)) {
            return $this->errorResponse(violations: $violations);
        }

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $this->json(['user' => $user]);
    }

    #[Route('/user/{id}', name: 'user.show', methods: ['GET'])]
    public function show(int $id): JsonResponse
    {
        $user = $this->repository->find($id);

        if (!$user) {
            return $this->errorResponse(error: 'User not found.', code: Response::HTTP_NOT_FOUND);
        }

        return $this->json(['user' => $user]);
    }

    #[Route('/user/{id}', name: 'user.delete', methods: ['DELETE'])]
    public function delete(int $id): JsonResponse
    {
        $user = $this->repository->find($id);

        if (!$user) {
            return $this->errorResponse(error: 'User not found.', code: Response::HTTP_NOT_FOUND);
        }

        $this->entityManager->remove($user);
        $this->entityManager->flush();

        return $this->json(['success' => true]);
    }

    private function setRequestData(User $user, Request $request): void
    {
        $user->setFirstName((string)$request->get('firstName', ''))
            ->setLastName((string)$request->get('lastName', ''))
            ->setEmail((string)$request->get('email', ''))
            ->setPhoneNumber((string)$request->get('phoneNumber', ''))
        ;
    }

    private function errorResponse(
        string $error = '',
        ?ConstraintViolationListInterface $violations = null,
        int $code = Response::HTTP_UNPROCESSABLE_ENTITY
    ): JsonResponse {
        $response = [];

        if ($error) {
            $response['error'] = $error;
        }

        if ($violations && count($violations)) {
            $response['violations'] = [];

            foreach ($violations as $violation) {
                $response['violations'][] = $violation->getMessage();
            }
        }

        return $this->json($response, $code);
    }
}
