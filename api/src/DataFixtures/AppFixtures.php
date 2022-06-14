<?php

namespace App\DataFixtures;

use App\Entity\Product;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasher;

class AppFixtures extends Fixture implements ContainerAwareInterface
{
    private ContainerInterface $container;

    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }

    public function load(ObjectManager $manager): void
    {
        $productOne = new Product();
        $productOne->setName('Product One');
        $productOne->setArticleNumber('dad218eh2h2');
        $productOne->setDescription('Lorem Ipsum');
        $productOne->setImage('product_1.png');
        $productOne->setPrice(3000);
        $manager->persist($productOne);

        $productTwo = new Product();
        $productTwo->setName('Product Two');
        $productTwo->setArticleNumber('dad213we1222h2');
        $productTwo->setDescription('Lorem Ipsum lorem ipsum');
        $productTwo->setImage('product_2.png');
        $productTwo->setPrice(4000);
        $manager->persist($productTwo);

        $user = new User();
        $user->setName('user');
        $user->setPassword($this->container->get(UserPasswordHasher::class)->hashPassword($user, 'password'));
        $manager->persist($user);

        $manager->flush();
    }
}
