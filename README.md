
<h2>General Info </h2>

This is a two player chess game that was build a project that was build for a university course.

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
<ul>
<li>Rejoining a quit game.</li>
<li>Background and click sound-effects.</li>
<li>Highlighting possible moves in the Ui</li>
</ul>

<h2>Known issues </h2>

<ul>
<li>When the game stops running both players should be notified</li>
<li>Board does not show files and Rank numbering</li>
<li>No coordinate to fileRank/numbering translation.</li>
<li>Code quality in general 
  (a lot of refactoring has to be done)</li>
<li>using a server as the backend is not really the best way / using a peerToPeer connection would make more sense.
  (but a server-backend was a requirement)</li>
</ul> 
  

<h2>Licensing</h2>
No License.
Use at your own risk.

