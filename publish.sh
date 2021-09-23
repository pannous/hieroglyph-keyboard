git pull --all --recurse-submodules=on-demand  
git commit -a --all --allow-empty-message -m ''  
git push --all --recurse-submodules=on-demand  

rsync -av --exclude '*.git' /Users/me/Documents/uruk_egypt/hieroglyph-keyboard pannous.com:~/
# scp -r /me/Documents/uruk_egypt/hieroglyph-keyboard pannous.com:~/
echo todo see netbase
ssh pannous.com screen -R hierokeys ; cd ~/hieroglyph-keyboard; gp; ./vocab.js