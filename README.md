
<h2>General Info </h2>

This is a two player chess game that was build a project that was build for the course Web Technologies at TU Graz.

<h3>Technologies</h3>
This was implemented in "pure" html, css and javascript.
We used an express back end server that handles the communication,
between the clients.



<h2>How to run the application</h2>
1. Run the server.js -> which starts the express backend service
2. Run the index.html inside /public -> which starts a client.

Note: Two different client instances have to be started.

The first client can ether choose to start a new game, or join an existing game that was saved in his local web-storage.
With the connection string sent to the second player a game can be played.


<h2>Features</h2>
* Rejoining a quit game.
* Background and click sound-effects.
* Highlighting possible moves in the Ui



<h2>Known issues </h2>
* The black - board should be inverted along the x-Axis
* When the game stops running both players should be notified
* Board does not show files and Rank numbering
* No coordinate to fileRank/numbering translation.
* Code quality in general 
  (a lot of refactoring has to be done)
  

<h2>Licensing</h2>
No License.
Use at your own risk.

