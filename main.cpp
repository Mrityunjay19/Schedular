#include<bits/stdc++.h>

using namespace std;

const int N = 100000;

set<int> colors[N];

int colorGraph(vector<vector<int>> &graph, int n, int k, int i, int j) {
    if (i == n)  return 1;
    if (j == n)  return colorGraph(graph, n, k, i + 1, 0);

    if (i == j)  return colorGraph(graph, n, k, i, j + 1);
    if (graph[i][j] != -1)   return colorGraph(graph, n, k, i , j + 1);

    for (int color = 0; color < k; color++) {
        if (colors[i].find(color) == colors[i].end() &&
                colors[j].find(color) == colors[j].end()) {
            graph[i][j] = color;
            graph[j][i] = color;
            colors[i].insert(color);
            colors[j].insert(color);
            int rem = colorGraph(graph, n, k, i, j + 1);
            if (rem == 1)    return rem;
            graph[i][j] = -1;
            graph[j][i] = -1;
            colors[i].erase(color);
            colors[j].erase(color);
        }
    }
    return -1;
}

void colorGraph(vector<vector<int>> &graph, int n, int k) {
    colorGraph(graph, n, k, 0, 0);
}

int32_t main(int argc,char* argv[])
{
    if(argc == 1){
        return 0;
    }
    int n = stoi(argv[1]); 
    int chromatic_number = n % 2 == 0 ? n - 1 : n;
    vector<vector<int>> graph(n, vector<int>(n, -1));
    colorGraph(graph, n, chromatic_number);
    map<int, vector<pair<int, int>>> mp;
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++)
            mp[graph[i][j]].push_back({i, j});
    }
    for (int i = 0; i < chromatic_number; i++) {
        cout << "Week "  << i + 1 << ":n";
        for (auto p : mp[i]) {
            cout << p.first << " v/s " << p.second << "n";
        }
    }
    return 0;
}