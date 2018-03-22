# bitcoincash

This is the repository for [bitcoincash.org](https://bitcoincash.org). As the Bitcoin Cash community expands, we hope that many will participate and improve this project over time.

Build & Run the Docker Image
----------------------------

In order to build and run the site you need ruby and docker. Then run:

1. `gem install bundler`
2. `bundle install`
3. `rake docker:build`
4. `docker run -d -p 8888:80 bitcoincash`

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

Listing Policy for Exchanges, Wallets, and Projects
---------------------------------------------------

Although many exchanges, wallets, and other projects would like to be listed on our website, BitcoinCash.org is not meant
to be an exhaustive directory.  There is limited space and quite simply, we only want to showcase the best of the best.

Only the top several exchanges by trading volume in each country will be considered.  

For wallets, we only want to list those that have the highest trust and best reputation within the community.  Relevant factors include the brand, the age of the wallet, as well as the track record of the company, developers, and/or other individuals involved.

We apologize in advance if we're unable to provide a listing for you on BitcoinCash.org.  We acknowledge the criteria for wallet listings are somewhat subjective. Please understand our decisions are not personal, but rather based on a conservative approach and our responsbility to safeguard the community against questionable projects.  Lastly, no listing should be interpreted as our explicit endorsement.

License
-------

bitcoincash.org is released under the terms of the MIT license. See [COPYING](COPYING) for more
information or see https://opensource.org/licenses/MIT.
