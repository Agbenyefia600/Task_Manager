from flask import Flask, render_template, request, jsonify
from datetime import datetime

app = Flask(__name__)

tasks = []

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/tasks", methods=["GET"])
def get_tasks():
    return jsonify(tasks)

@app.route("/api/tasks", methods=["POST"])
def add_task():
    data = request.get_json()
    task = {
        "id": len(tasks) + 1,
        "text": data.get("text", ""),
        "done": False,
        "created": datetime.now().strftime("%b %d, %H:%M")
    }
    tasks.append(task)
    return jsonify(task), 201

@app.route("/api/tasks/<int:task_id>", methods=["PATCH"])
def toggle_task(task_id):
    for task in tasks:
        if task["id"] == task_id:
            task["done"] = not task["done"]
            return jsonify(task)
    return jsonify({"error": "Not found"}), 404

@app.route("/api/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    global tasks
    tasks = [t for t in tasks if t["id"] != task_id]
    return jsonify({"ok": True})

if __name__ == "__main__":
    app.run(debug=True)
