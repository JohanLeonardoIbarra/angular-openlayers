export interface Issue {
    token:        string;
    service_name: string;
    address:      string;
    evaluation:   number;
    lat:          number;
    long:         number;
    typology:     Typology;
}

export interface Typology {
    color:                 string;
    typology_description:  string;
    visible_name:          string;
}