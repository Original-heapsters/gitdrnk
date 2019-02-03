def nuke(db):
    db.players.remove()
    db.games.remove()
    db.actions.remove()
    db.rules.remove()

    response = {"ok": True, "message": "All databases cleared"}
    code = 200
    return response, code
