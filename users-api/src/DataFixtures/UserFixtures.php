<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class UserFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        /*
         * php bin/console doctrine:database:create
         * php bin/console doctrine:migrations:migrate
         * php bin/console doctrine:fixtures:load
         * symfony server:start
         * open http://127.0.0.1:8000/user
         */
        $data = [
            [
                'firstName' => 'Mark',
                'lastName' => 'Otto',
                'email' => 'mark@otto.com',
                'phoneNumber' => '+38 (095)-142-52-13',
            ],
            [
                'firstName' => 'Jacob',
                'lastName' => 'Thornton',
                'email' => 'jac@fat.ua',
                'phoneNumber' => '+38 (091)-214-25-13',
            ],
            [
                'firstName' => 'Nikk',
                'lastName' => 'Tikker',
                'email' => 'nikk@tkr.ua',
                'phoneNumber' => '+38 (092)-142-82-18',
            ],
        ];

        foreach ($data as $userData) {
            $user = new User();
            $user->setFirstName($userData['firstName']);
            $user->setLastName($userData['lastName']);
            $user->setEmail($userData['email']);
            $user->setPhoneNumber($userData['phoneNumber']);

            $manager->persist($user);
        }

        $manager->flush();
    }
}
