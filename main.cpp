#include<bits/stdc++.h>
using namespace std;

const int N = 100000;

set<int> colors[N];

int colorGraphHelper(vector<vector<int>>& graph, int n, int k, int i, int j, int offset){
    if (i == n)  return 1;
    if (j == n)  return colorGraphHelper(graph, n, k, i + 1, offset, offset);

    if (i == j)  return colorGraphHelper(graph, n, k, i, j + 1, offset);
    if (graph[i][j] != -1)   return colorGraphHelper(graph, n, k, i , j + 1, offset);

    for (int color = 0; color < k; color++) {
        if (colors[i].find(color) == colors[i].end() &&
                colors[j].find(color) == colors[j].end()) {
            graph[i][j] = color;
            graph[j][i] = color;
            colors[i].insert(color);
            colors[j].insert(color);
            int rem = colorGraphHelper(graph, n, k, i, j + 1, offset);
            if (rem == 1)    return rem;
            graph[i][j] = -1;
            graph[j][i] = -1;
            colors[i].erase(color);
            colors[j].erase(color);
        }
    }
    return -1;
}

void colorGraph(vector<vector<int>>& graph, int nn, int k, int offset){
    colorGraphHelper(graph, offset+nn, k, offset, offset, offset);
}


void scheduleRoundRobin(int n, int pools, string prefix){

    int nn = n/pools;
    int chromatic_number = (nn%2 == 0)? nn-1 : nn;
    //Adjacency matrix representation of graph
    vector<vector<int>> graph(n, vector<int>(n, -1));
    

    for(int p=1 ; p<=pools ; p++){
        cout<<"~POOL "<< p <<":-~";

        int offset = nn*(p-1);
        colorGraph(graph, nn, chromatic_number, offset);

        map<int, vector<pair<int, int>>> mp;
        
        for (int i=offset ; i< offset+nn ; i++) {
            for (int j=i+1 ; j< offset+nn ; j++)
                mp[graph[i][j]].push_back({i, j});
        }

        for (int i=0 ; i<chromatic_number ; i++) {
            cout<<"Week "<< i+1 <<":~";
            for (auto p : mp[i]) {
                cout<< prefix <<"-"<< p.first+1 <<" v/s "<< prefix <<"-"<< p.second+1 << "~";
            }
        }

        cout<<"~";
    }
}


void scheduleKnockout(int n, int pools, string prefix){

    for(int p=1 ; p<=pools ; p++){
        cout<<"~POOL "<< p <<":-~";

        int nn = n/pools;
        int offset = nn*(p-1);

        int ctr = 1;

        //denotes 1 for bye and 0 for no bye for i'th team
        vector<int> pairing(n, 0);
        vector<string> temp;

        int uh_top = offset;
        int uh_bot = (nn%2 == 0)? offset + (nn/2)-1 : offset + nn/2;
        int lh_top = (nn%2 == 0)? offset + nn/2 : offset + (nn/2)+1;
        int lh_bot = offset + nn-1;

        int total_rounds = ceil(log2(nn));
        int byes = pow(2, total_rounds) - nn;

        for(int i=1 ; i<=byes ; i++){
            switch(i%4){

                case 0:
                    pairing[uh_bot] = 1;
                    break;

                case 1:
                    pairing[lh_bot] = 1;
                    lh_bot--;
                    break;

                case 2:
                    pairing[uh_top] = 1;
                    uh_top++;
                    break;

                case 3:
                    pairing[lh_top] = 1;
                    lh_top++;
                    break;
            }
        }

        cout<<"~Round 1:~";
        for(int i=offset ; i<offset+nn ; i++){
            if(pairing[i] == 0){
                cout<<"Match-"<< ctr <<": ";
                cout<< prefix <<"-"<< i+1 <<" v/s "<< prefix <<"-"<< i+2 <<"~";
                temp.push_back("Winner of Match-"+to_string(ctr));
                ctr++;
                i++;
            }
            else{
                temp.push_back(prefix + "-" + to_string(i+1));
            }
        }
        
        int round = 2;

        while(round <= total_rounds){
            
            cout<<"~Round "<< round <<":~";
            int size = temp.size();

            for(int i=0 ; i<size ; i+=2){
                cout<<"Match-"<< ctr <<": ";
                cout<< temp[i] <<" v/s "<< temp[i+1] <<"~";
                temp.push_back("Winner of Match-"+to_string(ctr));
                ctr++;
            }

            temp.erase(temp.begin(), temp.begin()+size);
            round++;
        }
    }
}


void scheduleLeague(int n, int pools, string prefix){
    scheduleRoundRobin(n, pools, prefix);

    if(pools == 1){
        cout<<"~Semifinal-1: 1st Position v/s 4th Position~";
        cout<<"Semifinal-2: 2nd Position v/s 3rd Position~";
        cout<<"~FINAL: Winner of Semifinal-1 v/s Winner of Semifinal-2~";
    }
    else if(pools == 2){
        cout<<"~Semifinal-1: 1st Position(Pool-1) v/s 2nd Position(Pool-2)~";
        cout<<"Semifinal-2: 2nd Position(Pool-1) v/s 1st Position(Pool-2)~";
        cout<<"~FINAL: Winner of Semifinal-1 v/s Winner of Semifinal-2~";
    }

}

int32_t main(int argc, char* argv[]){   
    if(argc == 1){
        return 0;
    }
    int n = stoi(argv[1]); 
    int pools = stoi(argv[2]);
    string match_type = argv[3];
    string sport = argv[4];
    string prefix;

    if(sport == "Cricket" || sport=="Football" || sport=="Basketball" || sport=="Hockey"){
		prefix = "Team";
	}
	else{
		prefix = "Player";
	}
    
    if(match_type == "RoundRobin"){
        scheduleRoundRobin(n, pools, prefix);
        
    }
    else if(match_type == "Knockout"){
        scheduleKnockout(n, pools, prefix);
    }
    else if(match_type == "League"){
        scheduleLeague(n, pools, prefix);
    }

    return 0;
}