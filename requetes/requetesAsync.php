<?php
require_once('fonctionsDB.php');

$request_payload = file_get_contents('php://input');
$data_requete = json_decode($request_payload, true);

if (isset($data_requete['action'])) {

    switch ($data_requete['action']) {

        case 'getTaches':
            // Vérifie si les champs nécessaires sont présents et non vides
            if (isset($data_requete['tache']['tache']) && isset($data_requete['tache']['description']) && isset($data_requete['tache']['importance'])) {

                $tache = htmlspecialchars($data_requete['tache']['tache']);
                $description = htmlspecialchars($data_requete['tache']['description']);
                $importance = htmlspecialchars($data_requete['tache']['importance']);
                // Appelle la fonction pour ajouter la tâche
                $result = ajouteTache($tache, $description, $importance);
                if ($result !== null) {
                    echo json_encode($result);
                } else {
                    echo json_encode(array('error' => 'Une erreur s\'est produite lors de l\'ajout de la tâche.'));
                }
            } else {
                echo json_encode(array('error' => 'Les champs ne sont pas tous saisis.'));
            }
            break;

        case 'supprimeTaches':
            // Vérifie si l'identifiant de la tâche est présent 
            if (isset($data_requete['tache']['id'])) {

                $idTache = htmlspecialchars($data_requete['tache']['id']);
                // Appelle la fonction pour supprimer la tâche
                $result = supprimeTache($idTache);

                if ($result) {
                    echo json_encode(array('success' => true));
                } else {
                    echo json_encode(array('error' => 'Falha ao suprimir tâche.'));
                }
            } else {
                echo json_encode(array('error' => 'ID de tâche non spécifié.'));
            }
            break;

        case 'trierParImportance':
            // Vérifie si l'identifiant de la tâche est présent 
            if (isset($data_requete['tache']['propriete'])) {
                // Assainit les données d'entrée
                $propriete = htmlspecialchars($data_requete['tache']['propriete']);
                echo trierParImportance();
            } else {
                echo json_encode(array('error' => 'ID de tâche non spécifié.'));
            }
            break;

        case 'trierParTache':
            // Vérifie si l'identifiant de la tâche est présent 
            if (isset($data_requete['tache']['propriete'])) {
                // Assainit les données d'entrée
                $propriete = htmlspecialchars($data_requete['tache']['propriete']);
                echo trierPartache();
            } else {
                echo json_encode(array('error' => 'ID de tâche non spécifié.'));
            }
            break;
    }
}