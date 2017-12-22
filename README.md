# bitcoincash

This is the repository for [bitcoincash.org](https://bitcoincash.org). As the Bitcoin Cash community expands, we hope that many will participate and improve this project over time.

Build & Run the Docker Image
----------------------------

1. `docker build -t bitcoincash .`
2. `docker run -d -p 8888:80 bitcoincash`

Contributions
-------------

If you want to submit updates to the website make sure you are editing `index.html.erb`. This is the template used to generate all translated html files via `rake translations:build`.

Adding Translations
-------------------

To add translations to the project, use `translations/en.yml` as a template and create a new file for your locale. Then translate all the content inside of the yaml file and send us a pull request.

About Bitcoin Cash
------------------

Bitcoin Cash brings sound money to the world.  Merchants and users are empowered with low fees and reliable confirmations. The future shines brightly with unrestricted growth, global adoption, permissionless innovation, and decentralized development.
 
All Bitcoin holders as of block 478558 are now owners of Bitcoin Cash. All Bitcoiners are welcome to join the Bitcoin Cash community as we move forward in creating sound money accessible to the whole world.

License
-------

bitcoincash.org is released under the terms of the MIT license. See [COPYING](COPYING) for more
information or see https://opensource.org/licenses/MIT.
