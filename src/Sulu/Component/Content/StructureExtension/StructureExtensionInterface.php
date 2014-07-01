<?php
/*
 * This file is part of the Sulu CMS.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Component\Content\StructureExtension;

use PHPCR\NodeInterface;

/**
 * interface for structure extension
 * @package Sulu\Component\Content\Mapper
 */
interface StructureExtensionInterface
{

    /**
     * set current language code to translates properties
     * @param $languageCode
     * @param $languageNamespace
     * @param $namespace
     */
    public function setLanguageCode($languageCode, $languageNamespace, $namespace);

    /**
     * save data to node
     * @param NodeInterface $node
     * @param mixed $data
     * @param string $webspaceKey
     * @param string $languageCode
     * @return
     */
    public function save(NodeInterface $node, $data, $webspaceKey, $languageCode);

    /**
     * load data from node
     * @param NodeInterface $node
     * @param string $webspaceKey
     * @param string $languageCode
     */
    public function load(NodeInterface $node, $webspaceKey, $languageCode);

    /**
     * returns name of extension
     * @return string
     */
    public function getName();

    /**
     * returns data of extension
     * @return array
     */
    public function getData();

}
