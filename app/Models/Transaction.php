<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $table = 'transactions';

    protected $fillable = [
        'status',
        'amount',
        'credits',
        'session_id',
        'user_id',
        'package_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function package()
    {
        return $this->belongsTo(Package::class);
    }

    public function getStatusAttribute($value)
    {
        return [
            0 => 'Pending',
            1 => 'Success',
            2 => 'Failed',
        ][$value];
    }
}
