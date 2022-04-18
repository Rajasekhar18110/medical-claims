from email.mime import application
from flask import Flask , request
'''from mysqlx import SqlStatement'''
'''from flask_sqlalchemy import SQLAlchemy'''
import base64
import psycopg2
import json
import db_connection

user_name = 'postgres'
password = '17102003'
applications = {};
# application_no = 1;

app = Flask(__name__)


@app.route('/check_user', methods=['GET', 'POST'])
def check_user():
    if (request.method == 'POST'):
        request_data = request.get_json()
        # return {"status":"ho rha"}
        if (request_data == None):
            print('user is null')

        print(request_data)
        conn = db_connection.get_db_connection(user_name, password)
        mycursor = conn.cursor()

        if (request_data["user"]["page_no"] == 1):
            page1 = '\'' + json.dumps(request_data) + '\''
            page2 = '\'' + "" + '\''
            page3 = '\'' + "" + '\''
            page4 = '\'' + "" + '\''
            status = '\'' + "PENDING" + '\''
            email = '\'' + request_data["user"]["email"] + '\''
            query = f"INSERT INTO application(user_id, page1, page2, page3, page4, pharmacist, medical_officer, da_jao, ao, ar, sr_ao, registrar) VALUES({email}, {page1}, {page2}, {page3}, {page4}, {status}, {status}, {status}, {status}, {status}, {status}, {status}) RETURNING application_id"
            print("\nQUERY:=>\n")
            print(query)

            mycursor.execute(query)
            result = mycursor.fetchone()
            conn.commit()
            print(type(result))
            print(result[0])
            applications[request_data["user"]["email"]] = result[0]
            mycursor.close()
            conn.close()

        else:
            print(applications)
            pg = "page" + str(request_data["user"]["page_no"])
            page = '\'' + json.dumps(request_data) + '\''
            email = '\'' + request_data["user"]["email"] + '\''
            print(request_data["user"]["email"])
            application_id = applications[request_data["user"]["email"]]
            query = f"UPDATE application SET {pg} = {page} WHERE user_id = {email} AND application_id = {application_id}"

            print("\nQUERY:=>\n")
            print(query)

            mycursor.execute(query)
            conn.commit()
            mycursor.close()
            conn.close()

    return {"status": "this is get request"}


@app.route('/updateStatus', methods=['GET', 'POST'])
def updateStatus():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in request data')

        print(request_data)
        conn = db_connection.get_db_connection(user_name, password)
        mycursor = conn.cursor()

        id = '\'' + request_data["authorityUser"]["application_id"] + '\''
        email_id = '\'' + request_data["authorityUser"]["email"] + '\''
        applicationStatus = '\'' + request_data["authorityUser"]["applicationStatus"] + '\''
        remarks = '\'' + request_data["authorityUser"]["remarks"] + '\''

        print('applicationStatus: ',applicationStatus)
        #print('email: ', email_id)
        #print("\n",type(email_id))

        '''
        as of now pharmacist is only authority. so i am directly changing status. Later 
        check if(request_data["authorityUser"]["email"] == 'pharmacistemail') then change pharmacist status.
        if(request_data["authorityUser"]["email"] == 'JAO') then update his status like that.
        '''
        if (email_id == '\''+'pharmacistxyz901@gmail.com'+ '\''):
            query = f"UPDATE application SET pharmacist = {applicationStatus} , pharmacist_remarks = {remarks} WHERE application_id  = {id}"

        elif (email_id  == '\''+'medical.officer.901@gmail.com'+'\''):
            query = f"UPDATE application SET medical_officer = {applicationStatus} , medical_officer_remarks = {remarks} WHERE application_id  = {id}"
            print("assignment of query successful")

        elif (email_id  == '\''+'tempusageww3@gmail.com'+'\''): # accountsection ,now i am considering this as an authority ppl if not later we can change 
            query = f"UPDATE application SET accountsection = {applicationStatus} , accountsection_remarks = {remarks} WHERE application_id  = {id}"

        elif (email_id  == '\''+'junioracc.xyz901@gmail.com'+'\''):
            query = f"UPDATE application SET da_jao = {applicationStatus} , da_jao_remarks = {remarks} WHERE application_id  = {id}"

        elif (email_id  == '\''+'assessing.officer.901@gmail.com'+'\''):
            query = f"UPDATE application SET ao = {applicationStatus} , ao_remarks = {remarks} WHERE application_id  = {id}"

        #elif (email_id  == 'email of ar'): # AR i am not considering this as of now later we have to change 

        elif (email_id  == '\''+'senior.audit.901@gmail.com'+'\''):
            query = f"UPDATE application SET sr_ao = {applicationStatus} , sr_ao_remarks = {remarks} WHERE application_id  = {id}"

        elif (email_id  == '\''+'registrar.officer.901@gmail.com'+'\''):
            query = f"UPDATE application SET registrar = {applicationStatus} , registrar_remarks = {remarks} WHERE application_id  = {id}"

        print("\nQUERY:=>\n")
        print(query)

        mycursor.execute(query)
        conn.commit()
        mycursor.close()
        conn.close()

    return {"status": "this is updateStatus get request"}


@app.route('/getData', methods=['GET', 'POST'])
def getData():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('user is null')

        print(request_data)
        conn = db_connection.get_db_connection(user_name, password)
        mycursor = conn.cursor()

        email_id = '\'' + request_data["user_data"]["email"] + '\''
        query = f"select * from application where user_id = {email_id}"

        print("\nQUERY:=>\n")
        print(query)

        mycursor.execute(query)
        result = mycursor.fetchall()
        print(type(result))
        print(json.loads(result[-1][2]))
        print(json.loads(result[-1][3]))
        print(json.loads(result[-1][4]))
        print(json.loads(result[-1][5]))
        print(type(result[-1][4]))
        mycursor.close()
        conn.close()

        return {"status": "ok" , "page1": json.loads(result[-1][2]), "page2":json.loads(result[-1][3]) ,"page3":json.loads(result[-1][4]) , "page4":json.loads(result[-1][5])}



    return {"status":"getdata working"}


@app.route('/getApplicationId', methods=['GET', 'POST'])
def getApplicationId():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return

        conn = db_connection.get_db_connection(user_name, password)
        mycursor = conn.cursor()

        email_id = '\'' + request_data["currentUser"]["email"] + '\''
        print('email: ', email_id)
        query = f"select application_id from application where user_id = {email_id}"
        mycursor.execute(query)
        result = mycursor.fetchall()
        result_arr = []
        for item in result:
            result_arr.append(str(item[0]))

        return {"status": "ok","result": result_arr}

    return {"status": "getApplicationId working"}

@app.route('/getallApplicationIdFromPharmacist', methods=['GET', 'POST'])
def getallApplicationIdFromPharmacist():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return

        conn = db_connection.get_db_connection(user_name, password)
        mycursor = conn.cursor()

        email_id = '\'' + request_data["user_data"]["email"] + '\''
        #print("qresult")
        print('email: ', email_id)
        #print("sresult")
        query = f"select application_id from application where pharmacist = 'approved' "
        #print("wresult")
        mycursor.execute(query)
        #print("wresult")
        result = mycursor.fetchall()
        result_arr = []
        #print("result")
        print(result)
        for item in result:
            result_arr.append(str(item[0]))
        print(result_arr)

        return {"status": "ok","result": result_arr}

    return {"status": "getApplicationIdFromPharmacist working"}


@app.route('/getallApplicationIdFromMedicalOff', methods=['GET', 'POST'])
def getallApplicationIdFromMedicalOff():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return

        conn = db_connection.get_db_connection(user_name, password)
        mycursor = conn.cursor()

        email_id = '\'' + request_data["user_data"]["email"] + '\''
        query = f"select application_id from application where medical_officer='approved' "
        mycursor.execute(query)
        result = mycursor.fetchall()
        result_arr = []
        for item in result:
            result_arr.append(str(item[0]))

        return {"status": "ok","result": result_arr}

    return {"status": "getallApplicationIdFromMedicalOff working"}


@app.route('/getallApplicationIdFromAccSec', methods=['GET', 'POST'])
def getallApplicationIdFromAccSec():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return

        conn = db_connection.get_db_connection(user_name, password)
        mycursor = conn.cursor()

        email_id = '\'' + request_data["user_data"]["email"] + '\''
        query = f"select application_id from application where accountsection='approved' "
        
        mycursor.execute(query)
        result = mycursor.fetchall()
        result_arr = []
        for item in result:
            result_arr.append(str(item[0]))

        return {"status": "ok","result": result_arr}

    return {"status": "getallApplicationIdFromAccSec working"}



@app.route('/getallApplicationIdFromDAorJAO', methods=['GET', 'POST'])
def getallApplicationIdFromDAorJAO():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return

        conn = db_connection.get_db_connection(user_name, password)
        mycursor = conn.cursor()

        email_id = '\'' + request_data["user_data"]["email"] + '\''
        query = f"select application_id from application where da_jao='approved' "
        
        mycursor.execute(query)
        result = mycursor.fetchall()
        result_arr = []
        for item in result:
            result_arr.append(str(item[0]))

        return {"status": "ok","result": result_arr}

    return {"status": "getallApplicationIdFromDAorJAO working"}



@app.route('/getallApplicationIdFromAO', methods=['GET', 'POST'])
def getallApplicationIdFromAO():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return

        conn = db_connection.get_db_connection(user_name, password)
        mycursor = conn.cursor()

        email_id = '\'' + request_data["user_data"]["email"] + '\''
        query = f"select application_id from application where ao='approved' "
        
        mycursor.execute(query)
        result = mycursor.fetchall()
        result_arr = []
        for item in result:
            result_arr.append(str(item[0]))

        return {"status": "ok","result": result_arr}

    return {"status": "getallApplicationIdFromAO working"}


@app.route('/getallApplicationIdFromSrAo', methods=['GET', 'POST'])
def getallApplicationIdFromSrAo():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return

        conn = db_connection.get_db_connection(user_name, password)
        mycursor = conn.cursor()

        email_id = '\'' + request_data["user_data"]["email"] + '\''
        query = f"select application_id from application where sr_ao='approved' "
        
        mycursor.execute(query)
        result = mycursor.fetchall()
        result_arr = []
        for item in result:
            result_arr.append(str(item[0]))

        return {"status": "ok","result": result_arr}

    return {"status": "getallApplicationIdFromSrAo working"}

@app.route('/showApplicationId/<id>', methods=['GET', 'POST'])
def showApplicationId(id):
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return
        id = '\'' + str(id) + '\''
        email_id = '\'' + request_data["user_data"]["email"] + '\''
        conn = db_connection.get_db_connection(user_name, password)
        mycursor = conn.cursor()
        query = f"select * from application where application_id = {id} and user_id = {email_id}"
        print(query)
        mycursor.execute(query)
        result = mycursor.fetchone()
        return {"status": "ok", "page1": json.loads(result[2]), "page2": json.loads(result[3]),
                "page3": json.loads(result[4]), "page4": json.loads(result[5])}

    return {"status": "ok", "result": "showApplication is working"}


@app.route('/getallApplicationId', methods=['GET', 'POST'])
def getallApplicationId():
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return

        conn = db_connection.get_db_connection(user_name, password)
        mycursor = conn.cursor()

        email_id = '\'' + request_data["user_data"]["email"] + '\''
        query = f"select application_id from application "
        mycursor.execute(query)
        result = mycursor.fetchall()
        result_arr = []
        for item in result:
            result_arr.append(str(item[0]))

        return {"status": "ok", "result": result_arr}

    return {"status": "getallapplicationId working"}


@app.route('/showallApplicationId/<id>', methods=['GET', 'POST'])
def showallApplicationId(id):
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return
        id = '\'' + str(id) + '\''
        email_id = '\'' + request_data["user_data"]["email"] + '\''
        conn = db_connection.get_db_connection(user_name, password)
        mycursor = conn.cursor()
        query = f"select * from application where application_id = {id}"
        print(query)
        mycursor.execute(query)
        result = mycursor.fetchone()
        return {"status": "ok", "page1": json.loads(result[2]), "page2": json.loads(result[3]),
                "page3": json.loads(result[4]), "page4": json.loads(result[5])}

    return {"status": "ok", "result": "showallapplication is working"}


@app.route('/showApplicationIdStatus/<id>', methods=['GET', 'POST'])
def showApplicationIdStatus(id):
    if (request.method == 'POST'):
        request_data = request.get_json()
        if (request_data == None):
            print('Error in reading request data')
            return
        id = '\'' + str(id) + '\''
        email_id = '\'' + request_data["user_data"]["email"] + '\''
        conn = db_connection.get_db_connection(user_name, password)
        mycursor = conn.cursor()
        authority="starts"
        query = f"select pharmacist from application where application_id = {id} and user_id = {email_id}"
        print(query)
        mycursor.execute(query)
        result = mycursor.fetchone()
        if(result[0]=="approved"):
            authority="Pharmacist"
        query = f"select medical_officer from application where application_id = {id} and user_id = {email_id}"
        print(query)
        mycursor.execute(query)
        result = mycursor.fetchone()
        if(result[0]=="approved"):
            authority="Medical Officer"
        query = f"select accountsection from application where application_id = {id} and user_id = {email_id}"
        print(query)
        mycursor.execute(query)
        result = mycursor.fetchone()
        if(result[0]=="approved"):
            authority="Account Section"
        query = f"select da_jao from application where application_id = {id} and user_id = {email_id}"
        print(query)
        mycursor.execute(query)
        result = mycursor.fetchone()
        if(result[0]=="approved"):
            authority="DA/JAO"
        query = f"select ao from application where application_id = {id} and user_id = {email_id}"
        print(query)
        mycursor.execute(query)
        result = mycursor.fetchone()
        if(result[0]=="approved"):
            authority="AO"
        query = f"select ar from application where application_id = {id} and user_id = {email_id}"
        print(query)
        mycursor.execute(query)
        result = mycursor.fetchone()
        if(result[0]=="approved"):
            authority="AR"
        query = f"select sr_ao from application where application_id = {id} and user_id = {email_id}"
        print(query)
        mycursor.execute(query)
        result = mycursor.fetchone()
        if(result[0]=="approved"):
            authority="SR_AO"
        query = f"select registrar from application where application_id = {id} and user_id = {email_id}"
        print(query)
        mycursor.execute(query)
        result = mycursor.fetchone()
        if(result[0]=="approved"):
            authority="Registrar"

        return {"status": "ok", "current_auth":authority}

    return {"status": "ok", "result": "showApplicationIdStatus is working"}


@app.route("/get_images", methods=["GET", "POST"])
def get_images():
    if(request.method == 'POST'):
        request_data = request.get_json()
        print(request_data)
        email = request_data["email"]
        application_id = applications[email]
        conn = db_connection.get_db_connection(user_name, password)
        mycursor = conn.cursor()
        mycursor.execute("SELECT name, encoding FROM bill WHERE application_id = %s", (application_id, ))
        result = mycursor.fetchall()

        imgs = []

        for i in range(0, len(result)):
            img = {
                    "id": "",
                    "name": "",
                    "sencoding": "" 
            }
            img["id"] = str(i)
            img["name"] = result[i][0]
            img["encoding"] = result[i][1]
            imgs.append(img)

    mycursor.close()
    conn.close()

    return {"status": "ok", "reuslt": imgs}


@app.route("/get_images_id/<id>", methods=["GET", "POST"])
def get_images_id(id):
    if(request.method == 'POST'):
        request_data = request.get_json()
        print(request_data)
        conn = db_connection.get_db_connection(user_name, password)
        mycursor = conn.cursor()
        mycursor.execute("SELECT name, encoding FROM bill WHERE application_id = %s", (id, ))
        result = mycursor.fetchall()

        imgs = []

        for i in range(0, len(result)):
            img = {
                    "id": "",
                    "name": "",
                    "sencoding": "" 
            }
            img["id"] = str(i)
            img["name"] = result[i][0]
            img["encoding"] = result[i][1]
            imgs.append(img)

    mycursor.close()
    conn.close()


    return {"status": "ok", "reuslt": imgs}

@app.route("/send_images", methods=["POST"])
def post_Other_img():
    email = request.form.get("email")
    data = request.files.getlist('myfiles')
    application_id = applications[email]

    conn = db_connection.get_db_connection(user_name, password)
    mycursor = conn.cursor()

    for i in range(0, len(data)):
        file = data[i].read()
        encoding  = base64.b64encode(file)
        encodingStr ="data:image/jpeg;base64,"  + encoding.decode('utf-8')
        binary = psycopg2.Binary(file)
        name = data[i].filename 
        mycursor.execute("INSERT INTO bill(application_id, image, name, encoding) VALUES(%s, %s, %s, %s)", (application_id, binary, name, encodingStr))
        conn.commit()

    mycursor.close()
    conn.close()

    return {"state": "00"}

    
if __name__ == "__main__":
    app.run()
