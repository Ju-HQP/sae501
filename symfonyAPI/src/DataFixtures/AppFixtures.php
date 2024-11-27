<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

use GuzzleHttp\Client;

use App\Entity\Benevole;

use Psr\Log\LoggerInterface;

class AppFixtures extends Fixture
{
	protected $logger;

	public function __construct(LoggerInterface $logger)
	{
		$this->logger = $logger;
	}

	public function load(ObjectManager $manager): void
	{
		if (count($manager->getRepository("App\Entity\Benevole")->findAll()) == 0) {
			/* $ebay = new Ebay($this->logger);
			//$ebay->setCategory('CDs');
			//$keywords = 'Ibrahim Maalouf' ;
			$ebay->setCategory('Livres');
			$keywords = 'Harry Potter' ;

			$formattedResponse = $ebay->findItemsAdvanced($keywords, 6);
			file_put_contents("ebayResponse.xml",$formattedResponse) ;
			
			$xml = simplexml_load_string($formattedResponse);
			

			if ($xml !== false) {
				foreach ($xml->children() as $child_1) {
					if ($child_1->getName() === "item") {
						if ($ebay->getParentCategoryIdById($child_1->primaryCategory->categoryId) == $ebay->getParentCategoryIdByName("Livres")) {
							$entityLivre = new Livre();
							$entityLivre->setId((int) $child_1->itemId);
							$title = $ebay->getItemSpecific("Book Title", $child_1->itemId) ;
							if ($title == null) $title = $child_1->title ;
							$entityLivre->setTitle($title);
							$author = $ebay->getItemSpecific("Author", $child_1->itemId) ;
							if ($author == null) $author = "" ;
							$entityLivre->setAuteur($author);
							$entityLivre->setISBN("");
							$entityLivre->setPrice((float) $child_1->sellingStatus->currentPrice); 
							$entityLivre->setAvailability(1);
							$entityLivre->setImage($child_1->galleryURL);
							$manager->persist($entityLivre);
							$manager->flush();
						}
						if ($ebay->getParentCategoryIdById($child_1->primaryCategory->categoryId) == $ebay->getParentCategoryIdByName("CDs")){
							$entityMusique = new Musique();
							$entityMusique->setId((int) $child_1->itemId);
							$title = $ebay->getItemSpecific("Release Title", $child_1->itemId) ;
							if ($title == null) $title = $child_1->title ;
							$entityMusique->setTitle($title);
							$artist = $ebay->getItemSpecific("Artist", $child_1->itemId) ;
							if ($artist == null) $artist = "" ;
							$entityMusique->setArtiste($artist);
							$entityMusique->setDateDeParution("");
							$entityMusique->setPrice((float) $child_1->sellingStatus->currentPrice); 
							$entityMusique->setAvailability(1);
							$entityMusique->setImage($child_1->galleryURL);
							if (!isset($albums)) {
								$deezerSearch = new Search($keywords);
								$artistes = $deezerSearch->searchArtist() ;
								$albums = $deezerSearch->searchAlbumsByArtist($artistes[0]->getId()) ;
							}
							$j = 0 ;
							$sortir = ($j==count($albums)) ;
							$albumTrouve = false ;
							while (!$sortir) {
								$titreDeezer = str_replace(" ","",mb_strtolower($albums[$j]->title)) ;
								$titreEbay = str_replace(" ","",mb_strtolower($entityMusique->getTitre())) ;
								$titreDeezer = str_replace("-","",$titreDeezer) ;
								$titreEbay = str_replace("-","",$titreEbay) ;
								$albumTrouve = ($titreDeezer == $titreEbay) ;
								if (mb_strlen($titreEbay) > mb_strlen($titreDeezer))
									$albumTrouve = $albumTrouve || (mb_strpos($titreEbay, $titreDeezer) !== false) ;
								 if (mb_strlen($titreDeezer) > mb_strlen($titreEbay))
									$albumTrouve = $albumTrouve || (mb_strpos($titreDeezer, $titreEbay) !== false) ;
								$j++ ;
								$sortir = $albumTrouve || ($j==count($albums)) ;
							}
							if ($albumTrouve) {
								$tracks = $deezerSearch->searchTracksByAlbum($albums[$j-1]->getId()) ;
								foreach ($tracks as $track) {
									$entityPiste = new Piste();
									$entityPiste->setTitle($track->title);
									$entityPiste->setMp3($track->preview);
									$manager->persist($entityPiste);
									$manager->flush();
									$entityMusique->addPiste($entityPiste) ;
								}
							}
							$manager->persist($entityMusique);
							$manager->flush();
						}
					}
				}
			}
			*/

			$benevole = new Benevole();
			$benevole->setNom("MARTIN");
			$benevole->setPrenom("Antoine");
			$benevole->setMdp("benevole1");
			$benevole->setMail("ant.martin@gmail.com");
			$benevole->setTel("0767347406");
			$benevole->setRole("benevole");
			$manager->persist($benevole);

			$benevole = new Benevole();
			$benevole->setNom("RETAUD");
			$benevole->setPrenom("Berranger");
			$benevole->setMdp("benevole2");
			$benevole->setMail("berranger.rt@gmail.com");
			$benevole->setPhoto("https://www.leparisien.fr/resizer/ct_WYEsReoHHR5VZonx9QrYcJq0=/622x971/cloudfront-eu-central-1.images.arcpublishing.com/leparisien/O7DVELRLZVHOFH3ZLPNV53EEVI.jpg");
			$benevole->setRole("admin");
			$manager->persist($benevole);

			$manager->flush();
		}
	}
}
