import json
import numpy as np
import pickle
import warnings
warnings.filterwarnings("ignore", category=UserWarning, module="sklearn")

__location =None
__data_columns = None
__model = None

def get_estimated_price(location,sqft,bhk,bath):
    try:
        loc_index = __data_columns.index(location.lower())
    except:
        loc_index = -1    


    x = np.zeros(len(__data_columns))
    x[0] = float(sqft)
    x[1] = bath
    x[2] = bhk
    if loc_index >= 0:
        x[loc_index] = 1

    return round(__model.predict([x])[0],2)

def get_location_name():
    return __location
    

def load_saved_artifact():
    print("loading saved artifact...start")
    global __data_columns
    global __location
    
    with open("server/artifacts/columns.json",'r') as f:
        __data_columns=json.load(f)['data_columns']
        __location=__data_columns[3:]

    global __model 
    with open("server/artifacts/banglore_home_price_model.pickle",'rb') as f:
        __model =pickle.load(f) 
    print("loading saved artifacts...done")       


if __name__ =="__main__":
    load_saved_artifact()
    print(get_location_name())
    print(get_estimated_price('1st Phase JP Nagar',1000,3,3))
    print(get_estimated_price('1st Phase JP Nagar',1000,2,2))