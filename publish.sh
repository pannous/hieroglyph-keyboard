git pull --all --recurse-submodules=on-demand  
git commit -a --all --allow-empty-message -m ''  
git push --all --recurse-submodules=on-demand  

rsync -av --exclude '*.git' /Users/me/Documents/uruk_egypt/hieroglyph-keyboard pannous.com:~/
rsync -av  /Users/me/Documents/uruk_egypt/my_egyptian_dictionary.csv pannous.com:~/
# scp -r /me/Documents/uruk_egypt/hieroglyph-keyboard pannous.com:~/

ssh pannous.com ./restart-services.sh
 # screen -R hierokeys ; cd ~/hieroglyph-keyboard; gp; ./vocab.js