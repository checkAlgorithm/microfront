# bash
pm2 delete all
cd vue2.0-1
pm2 start --name vue2.1-3001 npm -- run serve

cd ../vue2.0-2
pm2 start --name vue2.2-3002 npm -- run serve

cd ../vue3.0
pm2 start --name vue3.0-3003 npm -- run serve

cd ../react-project
pm2 start --name react-3000 npm -- run start