<?php

declare(strict_types=1);

namespace App\OpenApi;

use ApiPlatform\Core\OpenApi\Factory\OpenApiFactoryInterface;
use ApiPlatform\Core\OpenApi\OpenApi;
use ApiPlatform\Core\OpenApi\Model;
use ArrayObject;

class OpenApiFactory implements OpenApiFactoryInterface
{
    private OpenApiFactoryInterface $decorated;

    public function __construct(OpenApiFactoryInterface $decorated)
    {
        $this->decorated = $decorated;
    }

    /**
     * @param mixed[] $context
     */
    public function __invoke(array $context = []): OpenApi
    {
        $openApi = ($this->decorated)($context);
        /** @var ArrayObject $schemas */
        $schemas = $openApi->getComponents()->getSchemas();

        $this->addTokenToSchema($schemas);
        $this->addJwtTokenToDocumentation($openApi);

        return $openApi;
    }

    private function addTokenToSchema(ArrayObject $schemas): void
    {
        $schemas->offsetSet(
            'Token',
            new ArrayObject(
                [
                    'type' => 'object',
                    'properties' => [
                        'token' => [
                            'type' => 'string',
                            'readOnly' => true,
                        ],
                    ],
                ]
            )
        );
    }

    private function addJwtTokenToDocumentation(OpenApi $openApi): void
    {
        /** @var ArrayObject $schemas */
        $schemas = $openApi->getComponents()->getSchemas();

        $schemas->offsetSet(
            'Credentials',
            new ArrayObject(
                [
                    'type' => 'object',
                    'properties' => [
                        'name' => [
                            'type' => 'string',
                            'example' => 'user',
                        ],
                        'password' => [
                            'type' => 'string',
                            'example' => 'password',
                        ],
                    ],
                ]
            )
        );

        $pathItem = new Model\PathItem(
            'JWT Token',
            '',
            '',
            null,
            null,
            new Model\Operation(
                'postCredentialsItem',
                ['Token'],
                [
                    '200' => [
                        'description' => 'Get JWT token',
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    '$ref' => '#/components/schemas/Token',
                                ],
                            ],
                        ],
                    ],
                ],
                'Get JWT token to login.',
                '',
                null,
                [],
                new Model\RequestBody(
                    'Generate new JWT Token',
                    new ArrayObject(
                        [
                            'application/json' => [
                                'schema' => [
                                    '$ref' => '#/components/schemas/Credentials',
                                ],
                            ],
                        ]
                    ),
                ),
            ),
        );
        $openApi->getPaths()->addPath('/authentication_token', $pathItem);
    }
}
