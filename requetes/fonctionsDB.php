<?php
$connexion = connexionDB();

/**
 * Connection avec la base de données
 */
function connexionDB()
{
	define('DB_HOST', 'localhost');
	define('DB_USER', 'root');
	// define('DB_PASSWORD', 'root');			// MAC
	define('DB_PASSWORD', '');			// Windows

	$laConnexion = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD);

	if (!$laConnexion) {
		// La connexion n'a pas fonctionné
		die('Erreur de connexion à la base de données. ' . mysqli_connect_error());
	}

	$db = mysqli_select_db($laConnexion, 'to-do-list');

	if (!$db) {
		die('La base de données n\'existe pas.');
	}

	mysqli_query($laConnexion, 'SET NAMES "utf8"');
	return $laConnexion;
}


/**
 * Exécute la requête SQL
 * Si le paramètre $insert est true, retourne l'id de la ressource ajoutée à la db
 */
function executeRequete($requete, $insert = false)
{
	global $connexion;
	if ($insert) {
		mysqli_query($connexion, $requete);
		$lastInsertedId = $connexion->insert_id;

		$query = "SELECT * FROM taches WHERE id = $lastInsertedId";
		$result = mysqli_query($connexion, $query);


		if ($result && mysqli_num_rows($result) > 0) {

			return mysqli_fetch_assoc($result);
		} else {

			return null;
		}
	} else {
		$resultats = mysqli_query($connexion, $requete);
		return $resultats;
	}
}


/**
 * Ajoute une nouvelle tâche
 */
function ajouteTache($tache, $description, $importance)
{
	$query = "INSERT INTO taches (`tache`, `description`, `importance`) 
              VALUES ('" . $tache . "','" . $description . "','" . $importance . "')";
	return executeRequete($query, true);
}

/**
 * Supprime une tâche existante
 */
function supprimeTache($id)
{
	$query = "DELETE FROM taches WHERE id = " . $id;
	return executeRequete($query, true);
}


/*
 * Trie les tâches par nom (ordre alphabétique).
 * */
function trierPartache()
{
	$result = executeRequete("SELECT * FROM taches ORDER BY tache ASC");
	$taches = array();
	while ($row = $result->fetch_assoc()) {
		$taches[] = $row;
	}
	return json_encode($taches);
}

/*
 * Trie les tâches par niveau d'importance (croissant).*/

function trierParImportance()
{
	$result = executeRequete("SELECT * FROM taches ORDER BY importance ASC");
	$taches = array();
	while ($row = $result->fetch_assoc()) {
		$taches[] = $row;
	}
	return json_encode($taches);
}